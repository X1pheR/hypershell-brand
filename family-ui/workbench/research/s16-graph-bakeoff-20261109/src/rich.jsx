import React,{useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {ReactFlow,ReactFlowProvider,Background,Controls,ViewportPortal,useNodesState,MarkerType} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const projections=['Overview','Deployment','Network','Logical','Ingress','Observability'];
const nodeDefs=[
{id:'home-host',type:'group',parentId:null,category:'System',site:'Home',label:'Host pve-home',pos:[180,120],size:[410,285]},
{id:'home-vm',type:'group',parentId:'home-host',category:'System',site:'Home',label:'Virtual machine home',pos:[38,56],size:[275,165]},
{id:'home-app',parentId:'home-vm',category:'Service',site:'Home',label:'Service HomeSight',pos:[24,60]},
{id:'home-collector',parentId:'home-host',category:'Service',site:'Home',label:'Collector',pos:[35,245]},
{id:'oci-host',category:'System',site:'OCI',label:'Host OCI',pos:[940,115]},
{id:'oci-api',category:'Service',site:'OCI',label:'API Reach',pos:[945,280]},
{id:'internet-route',category:'Web route',site:'Internet',label:'Route /home',pos:[1650,190]},
{id:'internet-service',category:'Service',site:'Internet',label:'Remote status',pos:[1650,330]}
];
const edgeDefs=[
{id:'r1',source:'internet-route',target:'oci-api',label:'Ingress'},
{id:'r2',source:'oci-api',target:'home-app',label:'API'},
{id:'r3',source:'home-collector',target:'oci-api',label:'Metrics'},
{id:'r4',source:'home-app',target:'internet-service',label:'Status'},
{id:'r5',source:'oci-host',target:'oci-api',label:'Contains? No (relationship)'}
];
const plainStyle={width:150,height:54,fontSize:12,background:'#fff',color:'#111',border:'2px solid #777',borderRadius:7,padding:5};
const groupStyle={border:'2px dashed #777',borderRadius:12,background:'rgba(180,180,180,.08)',fontSize:12,padding:8};
const key='hypershell-s16-rich-spike-v1';
function loadPins(){try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}}
function posFor(x,p){const index=projections.indexOf(p);return {x:x.pos[0]+(!x.parentId?index*12:0),y:x.pos[1]+(!x.parentId?index*14:0)}}
function makeNodes(p,pins){
 return nodeDefs.map(x=>({id:x.id,type:x.type||'default',parentId:x.parentId||undefined,extent:x.parentId?'parent':undefined,draggable:!x.type,
  position:pins[p]?.[x.id]?.position||posFor(x,p),data:{label:x.label,category:x.category,site:x.site,pinned:!!pins[p]?.[x.id]?.pinned},
  style:x.type?{...groupStyle,width:x.size[0],height:x.size[1]}:{...plainStyle,border:x.category==='Web route'?'3px solid #222':'2px solid #777'}
 }));
}
const initialEdges=edgeDefs.map(x=>({id:x.id,source:x.source,target:x.target,label:x.label,type:'smoothstep',animated:false,markerEnd:{type:MarkerType.ArrowClosed,color:'#666'},style:{stroke:'#666',strokeWidth:2},labelStyle:{fontSize:11,fill:'#111'}}));
function Inner(){
 const [projection,setProjection]=useState('Overview'),[selected,setSelected]=useState(null),pins=useRef(loadPins());
 const [nodes,setNodes,onNodesChange]=useNodesState(()=>makeNodes('Overview',pins.current));
 const [edges]=useState(initialEdges);
 const save=()=>localStorage.setItem(key,JSON.stringify(pins.current));
 const pick=(kind,id)=>setSelected({kind,id});
 const updatePin=(pinned)=>{if(!selected||selected.kind!=='item')return;
 const node=nodes.find(x=>x.id===selected.id);if(!node||node.type==='group')return;
 const v={...(pins.current[projection]||{})};v[node.id]={position:{...node.position},pinned};pins.current={...pins.current,[projection]:v};save();
 setNodes(xs=>xs.map(x=>x.id===node.id?{...x,data:{...x.data,pinned}}:x));};
 const switchProjection=(p)=>{setProjection(p);setNodes(makeNodes(p,pins.current));setSelected(null)};
 const rearrange=()=>setNodes(xs=>xs.map((x,i)=>pins.current[projection]?.[x.id]?.pinned?x:{...x,position:x.parentId?x.position:{x:nodeDefs[i].pos[0]+60,y:nodeDefs[i].pos[1]+35}}));
 const reset=()=>{pins.current={...pins.current,[projection]:{}};save();setNodes(makeNodes(projection,pins.current))};
 const dragStop=useCallback((_,node)=>{const v={...(pins.current[projection]||{})};v[node.id]={position:{...node.position},pinned:!!v[node.id]?.pinned};pins.current={...pins.current,[projection]:v};save()},[projection]);
 useEffect(()=>{window.__rich={projection,selected,nodes:nodes.map(x=>({id:x.id,parentId:x.parentId,position:x.position,pinned:x.data.pinned})),edges:edges.map(x=>({id:x.id,source:x.source,target:x.target})),pins:JSON.parse(JSON.stringify(pins.current)),siteZones:['Home','OCI','Internet'],ready:true};},[projection,selected,nodes,edges]);
 return <div className="rich-shell">
 <header className="rich-header"><strong>React Flow · HomeSight function spike (MIT, no Pro)</strong>
 {projections.map(p=><button type="button" key={p} aria-pressed={projection===p} onClick={()=>switchProjection(p)}>{p}</button>)}
 <button type="button" onClick={()=>updatePin(true)}>Pin</button><button type="button" onClick={()=>updatePin(false)}>Unpin</button>
 <button type="button" onClick={rearrange}>Re-layout</button><button type="button" onClick={reset}>Reset current projection</button>
 </header>
 <div className="rich-main">
 <div id="rich-graph"><ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onNodeDragStop={dragStop}
 onNodeClick={(_,node)=>pick('item',node.id)} onEdgeClick={(_,edge)=>pick('relationship',edge.id)}
 nodesConnectable={false} fitView minZoom={.1} maxZoom={3} onlyRenderVisibleElements={false}>
 <Background/><Controls/>
 <ViewportPortal>
 <div className="site-zone" data-zone="Home" style={{left:0,top:0,width:760,height:490}}>Home — visual zone only</div>
 <div className="site-zone" data-zone="OCI" style={{left:830,top:0,width:600,height:490}}>OCI — visual zone only</div>
 <div className="site-zone" data-zone="Internet" style={{left:1520,top:0,width:420,height:490}}>Internet — visual zone only</div>
 </ViewportPortal>
 </ReactFlow></div>
 <aside className="rich-inspector" aria-label="Graph inspector">
 <h2>Selected entity</h2><output id="rich-selected" aria-live="polite">{selected?selected.kind+': '+selected.id:'None'}</output>
 <h3>Accessible items</h3><div role="list" aria-label="Topology items">{nodeDefs.map(x=><div role="listitem" key={x.id}><button type="button" onClick={()=>pick('item',x.id)}>{x.label}</button></div>)}</div>
 <h3>Relationships</h3><div role="list" aria-label="Topology relationships">{edgeDefs.map(x=><div role="listitem" key={x.id}><button type="button" onClick={()=>pick('relationship',x.id)}>{x.id+': '+x.label}</button></div>)}</div>
 </aside>
 </div><div id="meta">Synthetic HomeSight-compatible typed relationships. Zones are decorative; group parentId only represents real containment. Per-projection pins are local only.</div></div>
}
export default function Rich(){return <ReactFlowProvider><Inner/></ReactFlowProvider>}
