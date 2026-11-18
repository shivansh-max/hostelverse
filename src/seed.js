const day=(offset=0,time='12:00')=>{const d=new Date();d.setDate(d.getDate()+offset);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}T${time}`;};
export const categories=['Academics','Electronics','Gaming','Sports','Room essentials','Fashion','Cycling','Other'];
export const seed={
 profiles:[
  {id:'u1',name:'Alex Morgan',initials:'AM',hostel:'Maple House',year:'1st year',course:'Engineering',bio:'Big on sharing, small on waste.',color:'#AD705C',email:'demo@hostelverse.test'},
  {id:'u2',name:'Aarav Sharma',initials:'AS',hostel:'Maple House',year:'2nd year',course:'Computer Science',bio:'Gadgets, games and good deals.',color:'#75826B'},
  {id:'u3',name:'Meera Kapoor',initials:'MK',hostel:'Cedar House',year:'3rd year',course:'Design',bio:'Making campus life a little lighter.',color:'#C18D61'},
  {id:'u4',name:'Rohan Das',initials:'RD',hostel:'Maple House',year:'2nd year',course:'ECE',bio:'Always up for a game.',color:'#8782AB'},
  {id:'u5',name:'Zoya Khan',initials:'ZK',hostel:'Pine House',year:'4th year',course:'Economics',bio:'Travel, books and community.',color:'#B57974'}
 ],
 listings:[
  {id:'l1',ownerId:'u2',title:'Casio FX-991ES Plus',category:'Academics',type:'rent',price:15,unit:'hour',condition:'Like new',hostel:'Maple House',emoji:'🧮',tone:'sand',description:'Scientific calculator in excellent working condition. Perfect for labs and exams. Includes case.',createdAt:day(-2)},
  {id:'l2',ownerId:'u3',title:'Minimal desk lamp',category:'Room essentials',type:'sale',price:450,unit:'item',condition:'Good',hostel:'Cedar House',emoji:'💡',tone:'sage',description:'Warm adjustable light, clean design, works perfectly.',createdAt:day(-1)},
  {id:'l3',ownerId:'u4',title:'Wireless game controller',category:'Gaming',type:'rent',price:30,unit:'hour',condition:'Like new',hostel:'Maple House',emoji:'🎮',tone:'clay',description:'Bluetooth controller for PC and compatible setups. Fully charged before pickup.',createdAt:day(-3)},
  {id:'l4',ownerId:'u5',title:'First-year physics books',category:'Academics',type:'sale',price:280,unit:'item',condition:'Good',hostel:'Pine House',emoji:'📚',tone:'rose',description:'A set of introductory physics textbooks, a few highlighted pages.',createdAt:day(-5)},
  {id:'l5',ownerId:'u2',title:'Badminton racket set',category:'Sports',type:'rent',price:20,unit:'hour',condition:'Good',hostel:'Maple House',emoji:'🏸',tone:'sage',description:'Two lightweight badminton rackets with a shuttlecock.',createdAt:day(-1)},
  {id:'l6',ownerId:'u3',title:'Cozy throw blanket',category:'Room essentials',type:'free',price:0,unit:'item',condition:'Good',hostel:'Cedar House',emoji:'🧣',tone:'sand',description:'Freshly washed, ready for a new home.',createdAt:day(-4)},
  {id:'l7',ownerId:'u5',title:'Mirrorless camera',category:'Electronics',type:'rent',price:120,unit:'day',condition:'Good',hostel:'Pine House',emoji:'📷',tone:'clay',description:'Great for club projects and campus events. Includes battery and strap.',createdAt:day(-1)},
  {id:'l8',ownerId:'u4',title:'Gaming setup session',category:'Gaming',type:'rent',price:65,unit:'hour',condition:'Like new',hostel:'Maple House',emoji:'🕹️',tone:'lilac',description:'Book a supervised gaming session on my console. Supported local multiplayer games included; no account sharing.',createdAt:day(-2)},
  {id:'l9',ownerId:'u3',title:'Vintage tote bag',category:'Fashion',type:'swap',price:0,unit:'item',condition:'Good',hostel:'Cedar House',emoji:'👜',tone:'peach',description:'Looking to swap for other useful stationery or dorm accessories.',createdAt:day(-3)},
  {id:'l10',ownerId:'u2',title:'City cycle',category:'Cycling',type:'rent',price:50,unit:'day',condition:'Good',hostel:'Maple House',emoji:'🚲',tone:'green',description:'Comfortable city cycle for daytime campus commutes. Helmet available.',createdAt:day(-2)},
  {id:'l11',ownerId:'u5',title:'Portable mini projector',category:'Electronics',type:'rent',price:80,unit:'hour',condition:'Like new',hostel:'Pine House',emoji:'📽️',tone:'sand',description:'Compact mini projector ideal for movie nights and presentations.',createdAt:day(-1)},
  {id:'l12',ownerId:'u4',title:'Engineering drawing kit',category:'Academics',type:'sale',price:190,unit:'item',condition:'Good',hostel:'Maple House',emoji:'📐',tone:'rose',description:'Complete kit in reusable case. Great for first-years.',createdAt:day(-2)}
 ],
 bookings:[
  {id:'b1',listingId:'l4',buyerId:'u1',ownerId:'u5',kind:'purchase',hours:0,date:day(-3,'17:00'),amount:280,status:'completed',createdAt:day(-4)},
  {id:'b2',listingId:'l3',buyerId:'u1',ownerId:'u4',kind:'rental',hours:2,date:day(2,'19:00'),amount:60,status:'pending',createdAt:day(-1)}
 ],
 rides:[
  {id:'r1',ownerId:'u3',from:'Campus main gate',to:'New Delhi Railway Station',date:day(3,'16:30'),seats:3,price:180,joined:['u5'],note:'Splitting a licensed cab; flexible by 30 minutes.'},
  {id:'r2',ownerId:'u5',from:'Campus main gate',to:'IGI Airport Terminal 3',date:day(5,'05:30'),seats:2,price:290,joined:['u2'],note:'Early morning airport departure, licensed taxi only.'},
  {id:'r3',ownerId:'u2',from:'Campus main gate',to:'Kashmere Gate ISBT',date:day(2,'10:00'),seats:3,price:110,joined:[],note:'Planning to book together once seats are filled.'}
 ],
 requests:[
  {id:'q1',ownerId:'u3',title:'Need a tripod for a short film',category:'Electronics',budget:60,needed:day(2),body:'Need it for a campus shoot, around 3 hours.',offers:[]},
  {id:'q2',ownerId:'u4',title:'Looking for a calculus textbook',category:'Academics',budget:150,needed:day(4),body:'Happy to rent or buy a used copy.',offers:[]},
  {id:'q3',ownerId:'u5',title:'Need an extra controller tonight',category:'Gaming',budget:50,needed:day(1),body:'For a small game night with friends.',offers:[]}
 ],
 skills:[
  {id:'s1',ownerId:'u2',title:'C++ debugging buddy',category:'Coding',price:0,mode:'Exchange',description:'Bring your code; I can help find errors and explain concepts.',emoji:'💻',joined:[]},
  {id:'s2',ownerId:'u3',title:'Poster & Canva workshop',category:'Design',price:60,mode:'Paid',description:'Friendly one-to-one help with posters, type and layouts.',emoji:'🎨',joined:[]},
  {id:'s3',ownerId:'u5',title:'Public speaking practice',category:'Communication',price:0,mode:'Free',description:'Practice your presentations with encouraging feedback.',emoji:'🎙️',joined:[]},
  {id:'s4',ownerId:'u4',title:'Guitar basics',category:'Music',price:0,mode:'Exchange',description:'Learn a few beginner chords; happy to trade for coding help.',emoji:'🎸',joined:[]}
 ],
 lost:[
  {id:'f1',ownerId:'u2',kind:'found',title:'Blue insulated bottle',description:'Found near the campus library. Tell me the sticker details to claim.',place:'Library entrance',date:day(-1),resolved:false,emoji:'🧴'},
  {id:'f2',ownerId:'u5',kind:'lost',title:'Small sketchbook',description:'Kraft cover with doodles. Last seen near the common room.',place:'Common room',date:day(-2),resolved:false,emoji:'📒'},
  {id:'f3',ownerId:'u3',kind:'found',title:'Set of house keys',description:'Keys handed to reception; verify ownership with staff.',place:'Dining hall',date:day(-1),resolved:false,emoji:'🔑'}
 ],
 groups:[
  {id:'g1',ownerId:'u3',title:'Stationery starter pack',category:'Academics',goal:8,price:120,description:'Bulk order of notebooks, pens and sticky notes.',emoji:'✏️',members:['u3','u2','u5']},
  {id:'g2',ownerId:'u5',title:'Healthy snack box',category:'Food & essentials',goal:10,price:160,description:'Group order from a trusted nearby grocery store.',emoji:'🥜',members:['u5','u3','u4','u2']},
  {id:'g3',ownerId:'u2',title:'Lab apron order',category:'Academics',goal:12,price:240,description:'Group discount for standard cotton lab aprons.',emoji:'🥼',members:['u2','u4']}
 ],
 events:[
  {id:'e1',ownerId:'u3',title:'Weekend design jam',type:'Creative',date:day(4,'15:00'),place:'Campus design studio',slots:12,description:'Bring a laptop and make something creative together.',emoji:'🎨',members:['u3','u5','u2']},
  {id:'e2',ownerId:'u2',title:'Hackathon team matching',type:'Tech',date:day(6,'17:30'),place:'Innovation hub',slots:20,description:'Find a builder, designer or storyteller for your next hackathon.',emoji:'🚀',members:['u2','u4']},
  {id:'e3',ownerId:'u4',title:'Badminton doubles',type:'Sports',date:day(2,'18:00'),place:'College sports court',slots:8,description:'All levels welcome. Bring water and comfortable shoes.',emoji:'🏸',members:['u4','u2']},
  {id:'e4',ownerId:'u5',title:'Quiet study circle',type:'Study',date:day(3,'19:00'),place:'Main library',slots:10,description:'Work alongside other students for two focused hours.',emoji:'📖',members:['u5','u3']}
 ],
 chats:[
  {id:'c1',members:['u1','u4'],messages:[{id:'m1',from:'u4',text:'Hey! My controller is ready whenever you want to borrow it.',at:day(-1,'18:05')},{id:'m2',from:'u1',text:'Perfect, I sent a booking request for Friday!',at:day(-1,'18:12')} ]}
 ],
 reports:[],
 reviews:[{id:'v1',to:'u5',from:'u1',score:5,text:'Super smooth exchange, thank you!',at:day(-2)}],
 notifications:[{id:'n1',userId:'u1',text:'Your controller rental request is awaiting approval.',read:false,at:day(-1)},{id:'n2',userId:'u1',text:'Explore skill swaps and community events near you.',read:false,at:day(-1)}],
 favorites:{u1:['l1','l7']},
 currentUserId:'u1'
};
