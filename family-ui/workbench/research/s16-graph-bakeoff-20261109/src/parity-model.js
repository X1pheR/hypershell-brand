// Synthetic, canonical-semantic HomeSight parity fixture. No live inventory data.
export const projectionNames=['Overview','Deployment','Network','Logical','Ingress','Observability'];
export const items=[
{id:'home',name:'Home PVE',category:'System',site:'Home',status:'ok',x:115,y:105,width:420,height:330},
{id:'vm',name:'VM Infrastructure',category:'System',site:'Home',status:'ok',parentId:'home',x:166,y:167,width:315,height:240},
{id:'ui',name:'HomeSight UI',category:'Service',site:'Home',status:'warning',parentId:'vm',x:198,y:235},
{id:'collector',name:'Home Collector',category:'Service',site:'Home',status:'ok',parentId:'vm',x:320,y:315},
{id:'lan',name:'Home LAN',category:'Network',site:'Home',status:'ok',x:175,y:490},
{id:'oci',name:'OCI VM',category:'System',site:'OCI',status:'ok',x:750,y:125},
{id:'api',name:'Reach API',category:'Service',site:'OCI',status:'error',x:785,y:295},
{id:'vpn',name:'WireGuard',category:'Network',site:'OCI',status:'ok',x:715,y:465},
{id:'ingress',name:'Public Route',category:'Web route',site:'Internet',status:'ok',x:1390,y:135},
{id:'external',name:'Remote Client',category:'Service',site:'Internet',status:'ok',x:1410,y:320},
{id:'monitor',name:'Pulse Monitor',category:'Service',site:'Home',status:'warning',x:535,y:520},
{id:'bridge',name:'Bridge Proxy',category:'Service',site:'OCI',status:'ok',x:1010,y:490}
];
export const relationships=[
{id:'e1',from:'ingress',to:'api',type:'routes-to',views:['Overview','Ingress','Logical']},
{id:'e2',from:'api',to:'ui',type:'calls',views:['Overview','Logical','Ingress']},
{id:'e3',from:'collector',to:'api',type:'telemetry',views:['Overview','Observability','Logical']},
{id:'e4',from:'monitor',to:'collector',type:'monitors',views:['Overview','Observability']},
{id:'e5',from:'vpn',to:'lan',type:'vpn-peering',views:['Overview','Network']},
{id:'e6',from:'external',to:'ingress',type:'request',views:['Overview','Ingress']},
{id:'e7',from:'bridge',to:'ui',type:'proxies',views:['Overview','Ingress','Logical']},
{id:'e8',from:'api',to:'bridge',type:'calls',views:['Overview','Logical']},
{id:'e9',from:'monitor',to:'api',type:'observes',views:['Overview','Observability']},
{id:'e10',from:'collector',to:'monitor',type:'reports-to',views:['Overview','Observability']},
{id:'e11',from:'ui',to:'api',type:'queries',views:['Overview','Logical']},
{id:'e12',from:'ingress',to:'bridge',type:'routes-to',views:['Overview','Ingress']},
{id:'e13',from:'external',to:'api',type:'requests',views:['Overview','Ingress']},
{id:'e14',from:'lan',to:'vpn',type:'connected-to',views:['Overview','Network']},
{id:'e15',from:'oci',to:'api',type:'hosts',views:['Deployment']},
{id:'e16',from:'home',to:'vm',type:'contains',views:['Deployment']},
{id:'e17',from:'vm',to:'ui',type:'hosts',views:['Deployment']}
];
const perProjection=Object.fromEntries(projectionNames.map(name=>[name,items.map(x=>x.id)]));
perProjection.Deployment=['home','vm','ui','collector','oci','api','monitor','bridge'];
perProjection.Network=['lan','vpn'];
perProjection.Logical=['ui','collector','api','ingress','external','bridge'];
perProjection.Ingress=['ui','api','ingress','external','bridge'];
perProjection.Observability=['collector','monitor','api'];
export const byId=new Map(items.map(x=>[x.id,x]));
export function viewFor(projection,search=''){
  const permitted=new Set(perProjection[projection]||[]);
  const hits=new Set(items.filter(x=>permitted.has(x.id)&&x.name.toLowerCase().includes(search.trim().toLowerCase())).map(x=>x.id));
  if(!search.trim())for(const id of permitted)hits.add(id);
  // Compound parents are presentationally required to display child items; never silently change Inventory membership.
  for(const id of [...hits]){let p=byId.get(id)?.parentId;while(p){hits.add(p);p=byId.get(p)?.parentId}}
  const visibleItems=items.filter(x=>hits.has(x.id));
  const visibleRels=relationships.filter(x=>x.views.includes(projection)&&hits.has(x.from)&&hits.has(x.to));
  return {items:visibleItems,relationships:visibleRels,empty:visibleItems.length===0};
}
export const originalPosition=id=>{const x=byId.get(id);return {x:x.x,y:x.y}};
export const defaultPositions=()=>Object.fromEntries(items.map(x=>[x.id,originalPosition(x.id)]));
export const onlyPlainNodes=data=>data.items.filter(x=>!data.items.some(v=>v.parentId===x.id));
export function selectionNeighbors(id,view){
  const e=view.relationships.filter(x=>x.id===id||x.from===id||x.to===id);
  return {ids:[...new Set(e.flatMap(x=>[x.from,x.to]))],edges:e.map(x=>x.id)};
}
export function validateModel(){
  const ids=new Set(items.map(x=>x.id)),edges=new Set();
  if(ids.size!==items.length)throw new Error('duplicate canonical Item ID');
  for(const n of items){if(n.parentId&&!ids.has(n.parentId))throw new Error('missing container '+n.id);if(!n.site||!n.category)throw new Error('missing identity')}
  for(const e of relationships){if(edges.has(e.id)||!ids.has(e.from)||!ids.has(e.to)||!e.type)throw new Error('invalid canonical Relationship');edges.add(e.id)}
  return {itemCount:items.length,relationshipCount:relationships.length};
}
