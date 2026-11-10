import React,{memo,useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {ReactFlow,ReactFlowProvider,Background,Controls,ViewportPortal,useNodesState,MarkerType} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {fixture,frame} from './fixture';

const projections=['Overview','Deployment','Network','Logical','Ingress','Observability'];
const layoutKey='s16-richscale-local-pins-v1';
const cardStyle={width:110,height:45,fontSize:11,padding:4,border:'1px solid #555',borderRadius:5,background:'#fff'};
const groupStyle={width:425,height:270,fontSize:12,padding:6,background:'rgba(180,180,180,.08)',border:'2px dashed #444',borderRadius:10};
const CustomNode=memo(function CustomNode({data,selected}){
 return <div style={{width:'100%',height:'100%',boxSizing:'border-box',padding:4,
 background:data.status==='warning'?'#fff3c4':data.status==='error'?'#f8d5d5':'#fff',
 border:selected?'3px solid #333':'1px solid #666',fontSize:11}}>
 <strong>{data.label}</strong><span style={{display:'block',fontSize:9}}>{data.status} · {data.site}</span></div>});
const nodeTypes={rich:CustomNode};
const readPins=()=>{try{return JSON.parse(localStorage.getItem(layoutKey)||'{}')}catch{return {}}};
function build(n,ratio,projection,pins){
 const count=n-2,raw=fixture(count,ratio),extra=projections.indexOf(projection)*15;
 const base=[{id:'host-home',type:'group',position:{x:110+extra,y:95+extra},data:{label:'Host pve-home'},style:groupStyle,draggable:false},
 {id:'vm-home',type:'group',parentId:'host-home',extent:'parent',position:{x:30,y:55},data:{label:'VM home'},style:{...groupStyle,width:305,height:165},draggable:false}];
 const nodes=raw.nodes.map((v,i)=>{const nested=i<5;
 const pos=nested?{x:20+(i%2)*125,y:50+Math.floor(i/2)*43}:{x:v.x+650+extra,y:v.y+extra};
 const pinned=pins[projection]?.[v.id];
 return {id:v.id,type:'rich',parentId:nested?'vm-home':undefined,extent:nested?'parent':undefined,
  position:pinned?.position||pos,data:{label:v.label,status:v.status,site:v.site,pinned:!!pinned?.pinned},style:cardStyle};
 });
 const extraEdges=Array.from({length:n*ratio-raw.edges.length},(_,i)=>({id:'ext'+i,source:'n'+(i%count),target:'n'+((i+11)%count)}));
 const edges=[...raw.edges,...extraEdges].map(e=>({id:e.id,source:e.source,target:e.target,type:'straight',markerEnd:{type:MarkerType.ArrowClosed,color:'#555'},style:{stroke:'#777',strokeWidth:1}}));
 return {nodes:[...base,...nodes],edges,meta:raw};
}
function Inner({n,ratio}){
 const pins=useRef(readPins()),[projection,setProjection]=useState('Overview'),[selected,setSelected]=useState(null),[query,setQuery]=useState('');
 const source=useMemo(()=>build(n,ratio,projection,pins.current),[n,ratio,projection]);
 const [nodes,setNodes,onNodesChange]=useNodesState(source.nodes),[edges,setEdges]=useState(source.edges);
 const active=nodes.find(v=>v.id===selected?.id);const save=()=>localStorage.setItem(layoutKey,JSON.stringify(pins.current));
 const choose=(kind,id)=>setSelected({kind,id});
 const switchTo=(p)=>{setProjection(p);const v=build(n,ratio,p,pins.current);setNodes(v.nodes);setEdges(v.edges);setSelected(null)};
 const pin=(flag)=>{if(!active||active.type==='group'||selected?.kind!=='item')return;
 const prev={...(pins.current[projection]||{})};prev[active.id]={position:{...active.position},pinned:flag};
 pins.current={...pins.current,[projection]:prev};save();
 setNodes(xs=>xs.map(x=>x.id===active.id?{...x,data:{...x.data,pinned:flag}}:x))};
 const update=()=>setNodes(xs=>xs.map((x,i)=>i>=2&&i<52?{...x,data:{...x.data,status:'warning'}}:x));
 const reset=()=>{pins.current={...pins.current,[projection]:{}};save();setNodes(build(n,ratio,projection,pins.current).nodes)};
 const relayout=()=>setNodes(xs=>xs.map((x,i)=>x.type==='group'||pins.current[projection]?.[x.id]?.pinned?x:{...x,position:x.parentId?x.position:{x:650+(i%30)*130,y:Math.floor(i/30)*62}}));
 const dragStop=useCallback((_,node)=>{if(node.type==='group')return;const p={...(pins.current[projection]||{})};p[node.id]={position:{...node.position},pinned:!!p[node.id]?.pinned};pins.current={...pins.current,[projection]:p};save()},[projection]);
 useEffect(()=>{let mounted=true;(async()=>{await frame();if(!mounted)return;window.__s16rich={ready:true,nodesCount:n,edgesCount:edges.length,projection,selected,groups:nodes.filter(x=>x.type==='group').map(x=>({id:x.id,parent:x.parentId||null})),nodes:nodes.map(x=>({id:x.id,parent:x.parentId||null,pos:x.position,pinned:x.data.pinned,status:x.data.status})),pins:JSON.parse(JSON.stringify(pins.current))}})();return()=>{mounted=false}},[nodes,edges,selected,projection,n]);
 const matched=nodes.filter(x=>x.type!=='group'&&(!query||x.data.label.toLowerCase().includes(query.toLowerCase()))).slice(0,18);
 return <><div className="rich-header">
 <strong>React Flow memo + real containment · {n} nodes / {edges.length} relations</strong>
 {projections.map(p=><button type="button" aria-pressed={p===projection} key={p} onClick={()=>switchTo(p)}>{p}</button>)}
 <button type="button" onClick={()=>pin(true)}>Pin selected</button><button type="button" onClick={()=>pin(false)}>Unpin</button>
 <button type="button" onClick={relayout}>Re-layout</button><button type="button" onClick={reset}>Reset projection</button>
 <button type="button" onClick={update}>Update 50 statuses</button>
 </div>
 <div className="rich-main">
 <div id="rich-graph"><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange}
 onNodeDragStop={dragStop} onNodeClick={(_,node)=>choose('item',node.id)} onEdgeClick={(_,edge)=>choose('relationship',edge.id)}
 nodesConnectable={false} fitView onlyRenderVisibleElements={false} minZoom={0.01} maxZoom={3}>
 <Background/><Controls/><ViewportPortal>
 <div className="site-zone" data-zone="Home" style={{left:0,top:0,width:550,height:390}}>Home (zone only)</div>
 <div className="site-zone" data-zone="OCI" style={{left:600,top:0,width:750,height:390}}>OCI (zone only)</div>
 <div className="site-zone" data-zone="Internet" style={{left:1380,top:0,width:520,height:390}}>Internet (zone only)</div>
 </ViewportPortal></ReactFlow></div>
 <aside className="rich-inspector" aria-label="Graph inspector">
 <h2>Selected</h2><output aria-live="polite">{selected?.kind+': '+selected?.id||'None'}</output>
 <label>Find item<input type="search" value={query} onChange={e=>setQuery(e.target.value)}/></label>
 <div role="list" aria-label="Searchable accessible topology items">{matched.map(x=><div role="listitem" key={x.id}><button type="button" onClick={()=>choose('item',x.id)}>{x.data.label}</button></div>)}</div>
 <div role="list" aria-label="Relationships">{edges.slice(0,12).map(x=><div role="listitem" key={x.id}><button type="button" onClick={()=>choose('relationship',x.id)}>{x.id}</button></div>)}</div>
 </aside></div><div id="meta">Synthetic research only. Canonical relationship payload and full keyboard path not represented; site zones decorative, true groups have parentId.</div></>;
}
export default function App(p){return <ReactFlowProvider><Inner {...p}/></ReactFlowProvider>}
