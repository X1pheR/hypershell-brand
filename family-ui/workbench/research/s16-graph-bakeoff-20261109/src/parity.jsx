// Experimental HomeSight contract parity. Two real graph renderers share one semantic model/state/solver.
import React,{useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {ReactFlow,ReactFlowProvider,Background,Controls,ViewportPortal,MarkerType} from '@xyflow/react';
import cytoscape from 'cytoscape';import fcose from 'cytoscape-fcose';
import '@xyflow/react/dist/style.css';
import {items,relationships,projectionNames,viewFor,byId,defaultPositions,validateModel,selectionNeighbors} from './parity-model';
cytoscape.use(fcose);
const keyPrefix='hypershell-isolated-s16-parity-v2';
const style={fontFamily:'Arial,sans-serif',fontSize:12,color:'#111',background:'#fff',margin:0};
const sites=['Home','OCI','Internet'];
const baseRegions=[
{name:'Home',x:35,y:25,w:625,h:625},
{name:'OCI',x:685,y:25,w:535,h:625},
{name:'Internet',x:1260,y:25,w:395,h:625}
];
function load(renderer){try{return JSON.parse(localStorage.getItem(keyPrefix+'-'+renderer)||'{}')}catch{return {}}}
function save(renderer,state){localStorage.setItem(keyPrefix+'-'+renderer,JSON.stringify(state))}
function solver(view,positions,pins){
 return new Promise((resolve,reject)=>{
  if(!view.items.length){resolve({positions:{},ms:0});return}
  const start=performance.now();
  const cy=cytoscape({headless:true,styleEnabled:true,elements:[
   ...view.items.map(n=>({data:{id:n.id,...(n.parentId&&view.items.some(x=>x.id===n.parentId)?{parent:n.parentId}:{})},
      position:{x:positions[n.id]?.x??n.x,y:positions[n.id]?.y??n.y}})),
   ...view.relationships.map(e=>({data:{id:e.id,source:e.from,target:e.to,label:e.type}}))
  ],style:[{selector:'node',style:{width:110,height:48}},{selector:':parent',style:{padding:35}}],layout:{name:'preset'}});
  let ended=false;const guard=setTimeout(()=>{if(!ended){ended=true;cy.destroy();reject(new Error('bounded fCoSE solver timeout'))}},18000);
  try{
   const fixed=Object.entries(pins).filter(([k,x])=>x&&view.items.some(n=>n.id===k)).map(([nodeId])=>({nodeId,position:{x:positions[nodeId].x,y:positions[nodeId].y}}));
   const opts={name:'fcose',quality:'proof',randomize:false,animate:false,fit:false,packComponents:false,tile:false,
    nodeDimensionsIncludeLabels:false,numIter:600,...(fixed.length?{fixedNodeConstraint:fixed}:{})};
   cy.one('layoutstop',()=>{if(ended)return;ended=true;clearTimeout(guard);
    const mapped={};for(const n of view.items){const p=cy.getElementById(n.id).position();mapped[n.id]={x:p.x,y:p.y}}
    cy.destroy();resolve({positions:mapped,ms:performance.now()-start,fixedConstraints:fixed.length})});
   cy.layout(opts).run();
  }catch(e){if(!ended){ended=true;clearTimeout(guard);cy.destroy();reject(e)}}
 })
}
function useParity(renderer){
 const prior=useMemo(()=>load(renderer),[renderer]);
 const [projection,setProjection]=useState('Overview'),[search,setSearch]=useState('');
 const [positionsByProj,setPositionsByProj]=useState(prior.positions||{});
 const [pinsByProj,setPinsByProj]=useState(prior.pins||{});
 const [selected,setSelected]=useState(null),[multi,setMulti]=useState([]);
 const [busy,setBusy]=useState(false),[lastLayout,setLastLayout]=useState(null);
 const [notice,setNotice]=useState('');
 const refs=useRef({positionsByProj,pinsByProj});refs.current={positionsByProj,pinsByProj};
 const view=useMemo(()=>viewFor(projection,search),[projection,search]);
 const positions=useMemo(()=>({...defaultPositions(),...(positionsByProj[projection]||{})}),[positionsByProj,projection]);
 const pins=pinsByProj[projection]||{};
 const setPosition=(id,p,alsoPin=true)=>{
  if(!byId.has(id))return;
  const current=refs.current.positionsByProj[projection]||{};
  const next={...refs.current.positionsByProj,[projection]:{...current,[id]:{x:p.x,y:p.y}}};
  setPositionsByProj(next);refs.current.positionsByProj=next;
  if(alsoPin){const n={...refs.current.pinsByProj,[projection]:{...(refs.current.pinsByProj[projection]||{}),[id]:true}};
    setPinsByProj(n);refs.current.pinsByProj=n;save(renderer,{positions:next,pins:n})}
  else save(renderer,{positions:next,pins:refs.current.pinsByProj});
 };
 const togglePin=flag=>{
  if(selected?.kind!=='item')return;
  const n={...refs.current.pinsByProj,[projection]:{...(refs.current.pinsByProj[projection]||{}),[selected.id]:flag}};
  setPinsByProj(n);refs.current.pinsByProj=n;save(renderer,{positions:refs.current.positionsByProj,pins:n});
 };
 const doLayout=async(clearPins=false)=>{
  if(busy)return;
  setBusy(true);setNotice('');
  try{
   const existing=refs.current.pinsByProj[projection]||{};
   const appliedPins=clearPins?{}:existing;
   const current=refs.current.positionsByProj[projection]||{};
   const newPins=clearPins?{...refs.current.pinsByProj,[projection]:{}}:refs.current.pinsByProj;
   const result=await solver(view,{...defaultPositions(),...current},appliedPins);
   const newPositions={...refs.current.positionsByProj,[projection]:{...current,...result.positions}};
   // Constraint positions are the source of truth; no post-solver movement of pinned nodes.
   setPositionsByProj(newPositions);setPinsByProj(newPins);
   refs.current={positionsByProj:newPositions,pinsByProj:newPins};
   save(renderer,{positions:newPositions,pins:newPins});
   setLastLayout({ms:Math.round(result.ms),nativePins:result.fixedConstraints,kind:clearPins?'reset-all':'keep-pins'});
  }catch(e){setNotice('Layout error: '+String(e.message||e))}
  finally{setBusy(false)}
 };
 const pick=(kind,id,additive=false)=>{
  if(kind==='item'){
   if(additive){const next=multi.includes(id)?multi.filter(x=>x!==id):[...multi,id];setMulti(next);
    setSelected(next.length?{kind,id:next[next.length-1]}:null)}
   else{setMulti([id]);setSelected({kind,id})}
  }else{setMulti([]);setSelected({kind,id})}
 };
 const clear=()=>{setMulti([]);setSelected(null)};
 const drag=(id,position)=>{
  const old=positions[id];const dx=position.x-old.x,dy=position.y-old.y;
  const moving=multi.includes(id)&&multi.length>1?multi:[id];
  const map={...refs.current.positionsByProj,[projection]:{...(refs.current.positionsByProj[projection]||{})}};
  const pin={...refs.current.pinsByProj,[projection]:{...(refs.current.pinsByProj[projection]||{})}};
  for(const x of moving){const prev=positions[x];map[projection][x]={x:prev.x+dx,y:prev.y+dy};pin[projection][x]=true}
  refs.current={positionsByProj:map,pinsByProj:pin};setPositionsByProj(map);setPinsByProj(pin);save(renderer,{positions:map,pins:pin});
 };
 const resetSelectionOnProjection=p=>{setProjection(p);setSelected(null);setMulti([]);setSearch('')};
 useEffect(()=>{const handle=e=>{if(e.key==='Escape'){clear();}};document.addEventListener('keydown',handle);return()=>document.removeEventListener('keydown',handle)},[]);
 return {renderer,projection,search,setSearch,resetSelectionOnProjection,positions,pins,selected,multi,view,choose:pick,clear,drag,togglePin,doLayout,busy,lastLayout,notice};
}
function NodeLabel({data}){return <div style={{fontSize:11,lineHeight:'14px'}}><strong>{data.name}</strong>{data.pinned?' 📍':''}<div>{data.category} · {data.status}</div></div>}
const nodeTypes={canonical:NodeLabel};
function ReactGraph({model}){
 const nodes=useMemo(()=>model.view.items.map(n=>{
  const pos=model.positions[n.id]||{x:n.x,y:n.y},parent=n.parentId&&model.view.items.find(x=>x.id===n.parentId);
  const relative=parent?{x:pos.x-model.positions[parent.id].x,y:pos.y-model.positions[parent.id].y}:pos;
  return {id:n.id,type:n.width?'group':'canonical',position:relative,...(parent?{parentId:parent.id,extent:'parent'}:{}),
    data:{...n,pinned:!!model.pins[n.id]},selected:model.multi.includes(n.id),draggable:!n.width,
    style:n.width?{width:n.width,height:n.height,padding:8,border:'2px dashed #555',background:'rgba(150,150,150,.1)',fontSize:12}:
    {width:115,height:48,padding:3,border:n.status==='error'?'2px solid #b00':n.status==='warning'?'2px dashed #a70':'1px solid #555',background:'#fff'}}
 }),[model.view,model.positions,model.pins,model.multi]);
 const edges=useMemo(()=>model.view.relationships.map(e=>{
 const focus=model.selected?.id===e.id||model.selected?.id===e.from||model.selected?.id===e.to;
 return {id:e.id,source:e.from,target:e.to,label:e.type,type:byId.get(e.from)?.site===byId.get(e.to)?.site?'bezier':'smoothstep',
    selected:model.selected?.id===e.id,markerEnd:{type:MarkerType.ArrowClosed,color:focus?'#111':'#666'},
    style:{stroke:focus?'#111':'#888',strokeWidth:focus?3:1},labelStyle:{fontSize:9,fill:'#222'}}
 }),[model.view,model.selected]);
 const onEnd=(_,node)=>{
  const parent=node.parentId,top=parent?model.positions[parent]:null;
  model.drag(node.id,top?{x:node.position.x+top.x,y:node.position.y+top.y}:node.position);
 };
 return <div className="s16-real-graph"><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}
 onNodeClick={(e,node)=>model.choose('item',node.id,e.ctrlKey||e.metaKey)}
 onEdgeClick={(_,edge)=>model.choose('relationship',edge.id)}
 onNodeDragStop={onEnd}
 onPaneClick={model.clear}
 nodesConnectable={false} fitView minZoom={.03} maxZoom={3} elementsSelectable>
 <Background/><Controls/>
 <ViewportPortal>{baseRegions.map(z=><div key={z.name} className="s16-site" data-site={z.name}
  style={{position:'absolute',left:z.x,top:z.y,width:z.w,height:z.h,border:'1px dashed #888',borderRadius:10,padding:8,pointerEvents:'none',color:'#777',fontSize:18,zIndex:-1}}>{z.name} (presentation)</div>)}</ViewportPortal>
 </ReactFlow></div>;
}
function CytoGraph({model}){
 const ref=useRef(null),cyRef=useRef(null),modelRef=useRef(model);modelRef.current=model;
 useEffect(()=>{
  if(!ref.current)return;
  const els=[
  ...model.view.items.map(n=>({data:{id:n.id,label:n.name,status:n.status,category:n.category,pinned:!!model.pins[n.id],...(n.parentId&&model.view.items.find(x=>x.id===n.parentId)?{parent:n.parentId}:{})},
     position:model.positions[n.id]})),
  ...model.view.relationships.map(e=>({data:{id:e.id,source:e.from,target:e.to,label:e.type}}))
  ];
  const cy=cytoscape({container:ref.current,elements:els,
  layout:{name:'preset',fit:true,padding:40},minZoom:.03,maxZoom:3,
  style:[{selector:'node',style:{label:'data(label)','font-size':10,width:75,height:39,'text-valign':'bottom','text-margin-y':8,'background-color':'#8dacc4','border-color':'#555','border-width':1}},
  {selector:'node[status="warning"]',style:{'border-width':3,'border-color':'#b80'}},
  {selector:'node[status="error"]',style:{'border-width':3,'border-color':'#c00'}},
  {selector:':parent',style:{'background-opacity':.1,'background-color':'#888','border-width':2,'border-color':'#555','border-style':'dashed','padding':30}},
  {selector:'node:selected',style:{'border-width':4,'border-color':'#111'}},
  {selector:'edge',style:{label:'data(label)','font-size':8,'text-rotation':'autorotate',width:1,'line-color':'#888','target-arrow-shape':'triangle','target-arrow-color':'#888','curve-style':'bezier'}},
  {selector:'edge:selected',style:{width:3,'line-color':'#111','target-arrow-color':'#111'}}]});
  cyRef.current=cy;window.__s16ParityCy=cy; // Isolated test harness instrumentation only.
  cy.on('tap','node',e=>modelRef.current.choose('item',e.target.id(),!!(e.originalEvent?.ctrlKey||e.originalEvent?.metaKey)));
  cy.on('tap','edge',e=>modelRef.current.choose('relationship',e.target.id()));
  cy.on('tap',e=>{if(e.target===cy)modelRef.current.clear()});
  const origin=new Map();
  cy.on('grab','node',e=>origin.set(e.target.id(),{...e.target.position()}));
  cy.on('dragfree','node',e=>{const n=e.target;const p=n.position();modelRef.current.drag(n.id(),{x:p.x,y:p.y});});
  return()=>{cyRef.current=null;window.__s16ParityCy=null;cy.destroy()}
 },[model.projection,model.search]);
 useEffect(()=>{const cy=cyRef.current;if(!cy)return;
  cy.batch(()=>{
   for(const node of model.view.items){const n=cy.getElementById(node.id);if(!n.nonempty())continue;
    const pos=model.positions[node.id];if(pos)n.position(pos);
    n.data('pinned',!!model.pins[node.id]);
    if(model.multi.includes(node.id))n.select();else n.unselect();
   }
   for(const rel of model.view.relationships){const e=cy.getElementById(rel.id);if(e.nonempty()){if(model.selected?.id===rel.id)e.select();else e.unselect()}}
  });
 },[model.positions,model.pins,model.multi,model.selected,model.view]);
 return <div className="s16-real-graph s16-cyto-parent"><div ref={ref} style={{position:'absolute',inset:0,zIndex:2}}></div>
 <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:1}}>{sites.map((site,i)=><div key={site} data-site={site} style={{position:'absolute',left:i*33+'%',top:2,width:'32%',height:'94%',border:'1px dashed #bbb',boxSizing:'border-box',fontSize:18,color:'#aaa'}}>{site}</div>)}</div>
 </div>
}
function Parity({renderer}){
 const model=useParity(renderer),selectedItem=model.selected?.kind==='item'?byId.get(model.selected.id):null;
 const selectedRel=model.selected?.kind==='relationship'?relationships.find(x=>x.id===model.selected.id):null;
 const neighbors=model.selected?selectionNeighbors(model.selected.id,model.view):{ids:[],edges:[]};
 useEffect(()=>{
  window.__s16Parity={renderer,ready:true,projection:model.projection,search:model.search,
  itemIDs:model.view.items.map(x=>x.id),relationshipIDs:model.view.relationships.map(x=>x.id),selected:model.selected,
  multi:model.multi,pins:model.pins,positions:model.positions,lastLayout:model.lastLayout,busy:model.busy,notice:model.notice,
  selectedNeighborhood:neighbors,
  completeSourceCount:validateModel()};
 },[renderer,model.projection,model.search,model.view,model.selected,model.multi,model.pins,model.positions,model.lastLayout,model.busy,model.notice]);
 return <div className="s16-parity-shell" style={style}>
  <header className="s16-parity-bar"><strong>S16 contract parity · {renderer==='cyto'?'Cytoscape.js':'React Flow MIT'}</strong>
  {projectionNames.map(p=><button type="button" key={p} aria-pressed={model.projection===p} onClick={()=>model.resetSelectionOnProjection(p)}>{p}</button>)}
  </header>
  <nav className="s16-parity-bar" aria-label="Map controls">
   <label>Map Search <input aria-label="Map Search" type="search" value={model.search} onChange={e=>model.setSearch(e.target.value)} /></label>
   <button type="button" onClick={()=>model.togglePin(true)}>Pin</button>
   <button type="button" onClick={()=>model.togglePin(false)}>Unpin</button>
   <button type="button" disabled={model.busy} onClick={()=>model.doLayout(false)}>Reset layout (keep pins)</button>
   <button type="button" disabled={model.busy} onClick={()=>model.doLayout(true)}>Reset all positions</button>
   <button type="button" onClick={model.clear}>Clear selection</button>
  </nav>
  <div className="s16-parity-workspace">
   <div className="s16-real-wrapper">{model.view.empty?<p role="status">No current Inventory facts in selected Map scope</p>:
    renderer==='cyto'?<CytoGraph model={model}/>:<ReactFlowProvider><ReactGraph model={model}/></ReactFlowProvider>}
   </div>
   <aside className="s16-parity-inspector" aria-label="Map Inspector">
    <h2>Selected</h2><output data-testid="selection" aria-live="polite">{model.selected?model.selected.kind+': '+model.selected.id:'None'}</output>
    {selectedItem&&<section><h3>{selectedItem.name}</h3><p>Inventory Item · {selectedItem.category} · {selectedItem.site} · {selectedItem.status}</p><p>{model.pins[selectedItem.id]?'Pinned':'Unpinned'}</p></section>}
    {selectedRel&&<section><h3>Relationship: {selectedRel.type}</h3><p>{selectedRel.from} → {selectedRel.to} (canonical direction)</p></section>}
    <h3>Current Items</h3><div role="list" aria-label="Map Items">{model.view.items.map(n=>
     <div role="listitem" key={n.id}><button type="button" onClick={e=>model.choose('item',n.id,e.ctrlKey||e.metaKey)}
       aria-pressed={model.multi.includes(n.id)}>{n.name}</button></div>)}</div>
    <h3>Current Relationships</h3><div role="list" aria-label="Map Relationships">{model.view.relationships.map(e=>
     <div role="listitem" key={e.id}><button type="button" onClick={()=>model.choose('relationship',e.id)}>{e.id}: {e.type}</button></div>)}</div>
   </aside>
  </div>
  <footer><span role="status">Current: {model.view.items.length} Items / {model.view.relationships.length} Relationships. {model.lastLayout?'fCoSE '+model.lastLayout.ms+'ms, native fixed nodes: '+model.lastLayout.nativePins+'. ':''}{model.notice}</span>
  <span>Research-only synthetic Inventory; full canonical Inventory fallback is product-owned.</span></footer>
 </div>;
}
export default function ParityRoot({renderer}){return <Parity renderer={renderer}/>}
