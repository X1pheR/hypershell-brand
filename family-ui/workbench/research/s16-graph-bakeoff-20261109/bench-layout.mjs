import dagre from '@dagrejs/dagre';
import ELK from 'elkjs/lib/elk.bundled.js';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import {fixture} from './src/fixture.js';
import fs from 'node:fs';
import {performance} from 'node:perf_hooks';
cytoscape.use(fcose);

const mode=process.argv[2]||'smoke';
const profiles={smoke:[{n:30,repeats:1}],accepted:[{n:22,repeats:3},{n:60,repeats:3}],medium:[{n:100,repeats:3}],stress:[{n:500,repeats:1}]};
if(!Object.hasOwn(profiles,mode)){console.error('Usage: node bench-layout.mjs {smoke|accepted|medium|stress}');process.exit(2)}
const specs=profiles[mode];
const ids={home:'group-home',vm:'group-vm'};
const w=115,h=48,pinnedIds=['n10','n20'];
function dataset(n,extra=false){
 const f=fixture(n,3);
 const nodes=[...f.nodes.map((p,i)=>({...p,parent:i<6?ids.vm:i<10?ids.home:null,width:w,height:h})),
 {id:ids.home,parent:null,width:420,height:310,x:80,y:55,group:true},
 {id:ids.vm,parent:ids.home,width:300,height:230,x:120,y:90,group:true}];
 const edgeCount=n===22?29:n===60?77:n*3;
 const edges=f.edges.slice(0,edgeCount).map(e=>({...e}));
 if(extra){
   nodes.unshift({id:'n'+n,parent:null,width:w,height:h,x:n*120,y:250,label:'New item A'},
                 {id:'n'+(n+1),parent:null,width:w,height:h,x:n*120+140,y:350,label:'New item B'});
   edges.push({id:'delta-edge-0',source:'n7',target:'n'+n},
              {id:'delta-edge-1',source:'n'+n,target:'n'+(n-4)},
              {id:'delta-edge-2',source:'n'+(n+1),target:'n'+n});
 }
 return {n,nodes,edges};
}
function serializePositions(m){return Object.fromEntries([...m].map(([id,p])=>[id,{x:Math.round(p.x*1000)/1000,y:Math.round(p.y*1000)/1000,width:p.width,height:p.height}]))}
function dagreLayout(data){
 const g=new dagre.graphlib.Graph({compound:true,multigraph:true});
 g.setGraph({rankdir:'LR',nodesep:35,ranksep:65,marginx:30,marginy:30});
 g.setDefaultEdgeLabel(()=>({}));
 for(const node of data.nodes)g.setNode(node.id,{width:node.group?node.width:w,height:node.group?node.height:h});
 for(const node of data.nodes)if(node.parent)g.setParent(node.id,node.parent);
 for(const e of data.edges)g.setEdge(e.source,e.target,{},e.id);
 const t=performance.now();dagre.layout(g);
 const positions=new Map(data.nodes.map(node=>{const p=g.node(node.id);return[node.id,{x:p.x,y:p.y,width:p.width,height:p.height}]}));
 return {positions,ms:performance.now()-t,metadata:{nativePinConstraint:false,groupMode:'compound'}};
}
const elk=new ELK();
async function elkLayout(data,previous){
 const all=new Map(data.nodes.map(x=>[x.id,x]));
 const pack=(node)=>{
   const children=data.nodes.filter(x=>x.parent===node.id).map(pack);
   const old=previous?.get(node.id);
   const res={id:node.id,width:node.group?node.width:node.width,height:node.group?node.height:node.height,
       ...old?{x:old.x,y:old.y}:{}};
   if(children.length)res.children=children;
   return res;
 };
 const graph={id:'root',layoutOptions:{
   'elk.algorithm':'layered','elk.direction':'RIGHT','elk.edgeRouting':'ORTHOGONAL',
   'elk.hierarchyHandling':'INCLUDE_CHILDREN','elk.spacing.nodeNode':'40',
   'elk.layered.spacing.nodeNodeBetweenLayers':'75',
   ...(previous?{'elk.interactive':'true'}:{})
 },children:data.nodes.filter(x=>!x.parent).map(pack),
 edges:data.edges.map(e=>({id:e.id,sources:[e.source],targets:[e.target]}))};
 const start=performance.now();const out=await elk.layout(graph);const ms=performance.now()-start;
 const positions=new Map();
 function visit(node,ox=0,oy=0){const x=ox+(node.x||0),y=oy+(node.y||0);if(node.id!=='root')positions.set(node.id,{x:x+(node.width||w)/2,y:y+(node.height||h)/2,width:node.width||w,height:node.height||h});for(const c of node.children||[])visit(c,x,y)}
 visit(out);
 return {positions,ms,metadata:{nativePinConstraint:false,groupMode:'nested',edgeSections:(out.edges||[]).filter(x=>x.sections?.length).length}};
}
async function fcoseLayout(data,previous,pins){
 const els=[...data.nodes.filter(x=>x.group).map(n=>({data:{id:n.id,...n.parent?{parent:n.parent}:{}},position:{x:n.x,y:n.y}})),...data.nodes.filter(x=>!x.group).map(n=>({data:{id:n.id,...n.parent?{parent:n.parent}:{}},position:previous?.get(n.id)||{x:n.x,y:n.y}})),...data.edges.map(e=>({data:{id:e.id,source:e.source,target:e.target}}))];
 const cy=cytoscape({headless:true,elements:els,styleEnabled:true,layout:{name:'preset'},style:[{selector:'node',style:{width:w,height:h}},{selector:':parent',style:{padding:20}}]});
 const start=performance.now();
 let options={name:'fcose',quality:previous?'proof':'default',randomize:!previous,animate:false,fit:false,packComponents:false,nodeDimensionsIncludeLabels:false,numIter:800,tile:false};
 if(previous&&pins?.size)options={...options,fixedNodeConstraint:[...pins].map(([nodeId,position])=>({nodeId,position}))};
 const stop=new Promise((resolve,reject)=>{cy.one('layoutstop',resolve);});
 const instance=cy.layout(options);instance.run();await stop;
 const ms=performance.now()-start;
 const positions=new Map(data.nodes.map(n=>{const p=cy.getElementById(n.id),xy=p.position(),bb=p.boundingBox({includeLabels:false,includeOverlays:false});return[n.id,{x:xy.x,y:xy.y,width:bb.w,height:bb.h}]}));
 cy.destroy();return {positions,ms,metadata:{nativePinConstraint:true,groupMode:'compound'}};
}
const engines={dagre:dagreLayout,elk:elkLayout,fcose:fcoseLayout};
function overlapPairs(positions,data){
 const plain=data.nodes.filter(n=>!n.group);
 let count=0;for(let i=0;i<plain.length;i++){const a=positions.get(plain[i].id);for(let j=i+1;j<plain.length;j++){const b=positions.get(plain[j].id);if(Math.abs(a.x-b.x)<(w*.9)&&Math.abs(a.y-b.y)<h*.9)count++;}}
 return count;
}
function centerDist(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
const median=arr=>{let a=[...arr].sort((x,y)=>x-y);return a.length?Number(((a[(a.length-1)>>1]+a[a.length>>1])/2).toFixed(2)):null};
function analyze(name,first,second,pins,baseline,after){
 const raw=second.positions,final=new Map(raw);
 for(const [id,pos] of pins)if(name!=='fcose')final.set(id,{...raw.get(id),x:pos.x,y:pos.y});
 const distances=baseline.nodes.filter(n=>!n.group&&!pins.has(n.id)).map(n=>centerDist(first.positions.get(n.id),final.get(n.id)));
 const pinsDrift=[...pins].map(([id,p])=>centerDist(final.get(id),p));
 const pinsNativeDrift=[...pins].map(([id,p])=>centerDist(raw.get(id),p));
 const baseOverlap=overlapPairs(first.positions,baseline),finalOverlap=overlapPairs(final,after);
 const containmentViolations=after.nodes.filter(n=>n.parent).filter(n=>{
  const child=final.get(n.id),par=final.get(n.parent);
  if(!child||!par)return true;
  return Math.abs(child.x-par.x)+(child.width||w)/2>(par.width||w)/2+3||Math.abs(child.y-par.y)+(child.height||h)/2>(par.height||h)/2+3;
 }).length;
 const groupCheck=after.nodes.filter(n=>n.parent).map(n=>({id:n.id,parent:n.parent})).every(n=>final.has(n.id)&&final.has(n.parent));
 return {engine:name,n:baseline.n,edges:baseline.edges.length,layout1Ms:Math.round(first.ms),layout2Ms:Math.round(second.ms),baselineOverlaps:baseOverlap,afterOverlaps:finalOverlap,
   pinMaxDrift:+Math.max(...pinsDrift).toFixed(3),rawLayoutPinMaxDrift:+Math.max(...pinsNativeDrift).toFixed(3),containmentViolations,medianUnpinnedShift:median(distances),p95UnpinnedShift:median(distances.slice().sort((a,b)=>a-b).slice(Math.floor(distances.length*.9))),
   pinImplementation:name==='fcose'?'native fixedNodeConstraint':'post-layout position override only; may overlap others',hierarchyPresent:groupCheck,
   positionCount:final.size,metadata:second.metadata};
}
let results=[];
for(const {n,repeats} of specs){for(const engine of Object.keys(engines)){for(let rep=0;rep<repeats;rep++){
 const base=dataset(n),after=dataset(n,true),row={engine,n,rep,pass:false};
 try{
  const first=await engines[engine](base);
  if(first.positions.size!==n+2)throw Error('incomplete initial nodes: '+first.positions.size);
  const pins=new Map(pinnedIds.map(id=>[id,first.positions.get(id)]));
  const second=await engines[engine](after,first.positions,pins);
  if(second.positions.size!==n+4)throw Error('incomplete incremental nodes: '+second.positions.size);
  Object.assign(row,analyze(engine,first,second,pins,base,after));
  row.pass=Number.isFinite(row.pinMaxDrift)&&row.hierarchyPresent&&row.positionCount===n+4&&row.pinMaxDrift<.5;
 }catch(e){row.error=String(e.stack||e).slice(0,750)}
 results.push(row);console.log('LAYOUT '+JSON.stringify(row));
}}
}
const report={mode,inputs:{edgeCounts:{'22':29,'60':77,'100':300,'500':1500},pins:pinnedIds,addedNodes:2,changedEdges:3,compoundDepth:2,positions:'center px',elk:'layered, interactive second pass; pins overridden after layout',dagre:'compound; pins overridden after layout',fcose:'default initial, proof incremental with fixedNodeConstraint'},results};
fs.mkdirSync('./reports',{recursive:true});fs.writeFileSync('./reports/layout-'+mode+'.json',JSON.stringify(report,null,2));
console.log('SUMMARY '+JSON.stringify({mode,total:results.length,pass:results.filter(x=>x.pass).length,fail:results.filter(x=>!x.pass).map(x=>({engine:x.engine,n:x.n,error:x.error||'pin or hierarchy failure'}))}));
