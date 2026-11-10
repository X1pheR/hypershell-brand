export function fixture(n,ratio=3){
 const categories=['System','Service','Network','Web route'],sites=['Home','OCI','Internet'],nodes=[],edges=[];
 const columns=Math.max(10,Math.ceil(Math.sqrt(n/2)));
 for(let i=0;i<n;i++)nodes.push({id:'n'+i,label:'Node '+i+' '+categories[i%4],category:categories[i%4],site:sites[i%3],status:i%17===0?'error':i%11===0?'warning':'ok',x:(i%columns)*135+(i%3)*columns*145,y:Math.floor(i/columns)*70});
 for(let i=0;i<n*ratio;i++){const source=i%n,target=(source+1+((i*37+11)%(n-1)))%n;if(source!==target)edges.push({id:'e'+i,source:'n'+source,target:'n'+target})}
 return {nodes,edges};
}
export const frame=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
export function ready(engine,graph){const api={engine,ready:true,nodeCount:graph.nodes.length,edgeCount:graph.edges.length,selected:null};window.__s16=api;const e=document.querySelector('#meta');if(e)e.textContent=engine+' | '+api.nodeCount+' nodes | '+api.edgeCount+' edges';return api;}
