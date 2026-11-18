import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {seed} from './src/seed.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(root, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match=line.match(/^\s*([\w]+)\s*=\s*(.*)\s*$/);
    if(match && !process.env[match[1]]) process.env[match[1]]=match[2].replace(/^['"]|['"]$/g,'');
  }
}
const app=express();
app.disable('x-powered-by');
app.use(express.json({limit:'2mb'}));

// Hackathon-only real-time shared demo store, NOT authenticated production storage.
const storeFile=path.join(root,'hostelverse-demo-data.json');
const fields=['profiles','listings','bookings','rides','requests','skills','lost','groups','events','chats','reviews','notifications','reports'];
let data=structuredClone(seed),revision=0;
try {if(fs.existsSync(storeFile)){const parsed=JSON.parse(fs.readFileSync(storeFile,'utf8'));if(parsed?.state?.listings) {data=parsed.state;revision=Number(parsed.revision)||0;}}}catch(e){console.warn('Starting from fresh demo data:',e.message)}
const listeners=new Set();
function emit(payload){const wire=`data: ${JSON.stringify(payload)}\n\n`;for(const res of listeners){try{res.write(wire)}catch{listeners.delete(res)}}}
app.get('/api/sync',(req,res)=>res.json({state:data,revision,mode:'shared-demo'}));
app.get('/api/live',(req,res)=>{
 res.setHeader('Content-Type','text/event-stream');res.setHeader('Cache-Control','no-cache, no-transform');res.setHeader('Connection','keep-alive');res.flushHeaders?.();
 res.write(`data: ${JSON.stringify({type:'connected',revision})}\n\n`);
 listeners.add(res);const ping=setInterval(()=>res.write(': ping\n\n'),25000);
 req.on('close',()=>{listeners.delete(res);clearInterval(ping)});
});
app.post('/api/change',(req,res)=>{
 const changes=req.body?.changes;
 if(!Array.isArray(changes)||changes.length>30) return res.status(400).json({error:'Invalid update batch.'});
 for(const change of changes){if(!fields.includes(change?.collection)||typeof change?.item?.id!=='string'||change.item.id.length>110)return res.status(400).json({error:'Invalid update.'});}
 for(const change of changes){const arr=data[change.collection];const index=arr.findIndex(x=>x.id===change.item.id);if(index===-1)arr.unshift(change.item);else arr[index]=change.item;}
 revision++;
 try{fs.writeFileSync(storeFile,JSON.stringify({state:data,revision}));}catch(e){console.error('Demo data not persisted:',e.message)}
 emit({type:'changes',changes,revision});return res.json({ok:true,revision});
});

const requestLimits=new Map();
app.post('/api/ai', async(req,res)=>{
  const ip=req.ip || 'visitor'; const now=Date.now();
  const attempts=(requestLimits.get(ip)||[]).filter(t=>now-t<60000);
  if(attempts.length>=12) return res.status(429).json({error:'Too many requests. Please try later.'});
  attempts.push(now); requestLimits.set(ip,attempts);
  const key=process.env.GEMINI_API_KEY;
  if(!key) return res.status(503).json({error:'Gemini not configured. Add GEMINI_API_KEY to .env.'});
  const {task,context}=req.body || {};
  if(!['chat','listing'].includes(task)||typeof context!=='string'||context.length>6500) return res.status(400).json({error:'Invalid request.'});
  const system=task==='listing'
    ? 'You are Hostelverse, a campus marketplace assistant. Rewrite the student supplied item details into one short, honest, warm listing description, maximum 50 words. Never invent specifications, condition, warranty or claims. Return only the description.'
    : 'You are Hostelverse, a friendly campus resource assistant. Respond in under 100 words. ONLY recommend listings, rides, skills or events that are explicitly in the supplied catalog. If none match, explain that no exact match exists and suggest posting a request. Never claim an actual booking happened. Do not include addresses, phone numbers, or private information. Be helpful and concise.';
  const model=process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  try {
    const controller=new AbortController(); const t=setTimeout(()=>controller.abort(),16000);
    const answer=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,{
      method:'POST',signal:controller.signal,
      headers:{'Content-Type':'application/json','x-goog-api-key':key},
      body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:[{role:'user',parts:[{text:context}]}],generationConfig:{temperature:.45,maxOutputTokens:360}})
    }); clearTimeout(t);
    const json=await answer.json();
    if(!answer.ok) return res.status(502).json({error:json.error?.message||'Gemini request failed.'});
    const text=json.candidates?.[0]?.content?.parts?.map(x=>x.text||'').join('').trim();
    if(!text) return res.status(502).json({error:'No Gemini response.'});
    return res.json({text,provider:'gemini'});
  } catch (e){ return res.status(502).json({error:e.name==='AbortError'?'Gemini timed out.':'Gemini is temporarily unavailable.'}); }
});
const dist=path.join(root,'dist');
if(fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*',(req,res)=>res.sendFile(path.join(dist,'index.html')));
} else {app.get('/',(req,res)=>res.type('text/plain').send('Start the Vite frontend with npm run dev, or build it with npm run build.'));}
const port=Number(process.env.PORT || 8787);
app.listen(port,()=>console.log(`Hostelverse AI/server running on http://localhost:${port}`));
