import {seed} from './seed.js';
const KEY='hostelverse-v1';
export function readState(){try {const stored=JSON.parse(localStorage.getItem(KEY));if(stored && stored.listings && stored.profiles) return stored;}catch{}return structuredClone(seed);}
export function saveState(s){try{localStorage.setItem(KEY,JSON.stringify(s));}catch(err){console.warn('Unable to persist Hostelverse locally:',err);}}
export function resetState(){const s=structuredClone(seed);saveState(s);return s;}
export const uid=(type='id')=>`${type}-${Math.random().toString(36).slice(2,9)}-${Date.now().toString(36)}`;
export const friendlyDate=(iso)=>new Date(iso).toLocaleDateString('en-IN',{day:'numeric',month:'short'});
export const friendlyDateTime=(iso)=>new Date(iso).toLocaleDateString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'});
export const money=n=>`₹${Number(n||0).toLocaleString('en-IN')}`;
