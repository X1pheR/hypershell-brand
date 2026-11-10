const fs=require('fs'),path=require('path'),os=require('os'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('/src/family-ui/workbench/node_modules/@playwright/test');
const root='/work/dist',mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);p=p==='/'?'/index.html':p;const f=path.resolve(root,'.'+p);if(!f.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(f,(e,d)=>{if(e)return res.writeHead(404).end();res.setHeader('content-type',mime[path.extname(f)]||'application/octet-stream');res.end(d)})});
async function main(){
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'s16-richscale-zoom-'));let context;
 try{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const origin='http://127.0.0.1:'+server.address().port,port='127.0.0.1:'+server.address().port;
  const ext=path.join(tmp,'ext');fs.mkdirSync(ext);
  fs.writeFileSync(path.join(ext,'manifest.json'),JSON.stringify({manifest_version:3,name:'S16 isolated zoom',version:'1.0',permissions:['tabs'],background:{service_worker:'background.js'}}));
  fs.writeFileSync(path.join(ext,'background.js'),'chrome.runtime.onInstalled.addListener(()=>{});');
  context=await chromium.launchPersistentContext(path.join(tmp,'profile'),{headless:true,executablePath:'/ms-playwright/chromium-1247/chrome-linux-arm64/chrome',viewport:{width:1280,height:900},hasTouch:true,args:['--disable-extensions-except='+ext,'--load-extension='+ext]});
  await context.route('**/*',r=>r.request().url().startsWith(origin+'/')?r.continue():r.abort());
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const cdp=await context.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  const report={browser:'Chromium ARM64',cpu:'4x CDP',touch:'Chromium synthetic touch, not physical hardware',measure:'capture click event to DOM MutationObserver update; avoids Playwright command overhead',cases:[]};
  let worker;
  for(const n of [100,500]){
   await page.goto(origin+'/?engine=richscale&n='+n+'&edges=3',{waitUntil:'domcontentloaded',timeout:30000});
   await page.waitForFunction(v=>window.__s16rich?.ready&&window.__s16rich.nodesCount===v,n,{timeout:60000});
   if(!worker)worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker',{timeout:12000});
   const zoom=await worker.evaluate(async port=>{const tab=(await chrome.tabs.query({})).find(t=>t.url?.includes(port));if(!tab)throw new Error('current tab absent');await chrome.tabs.setZoom(tab.id,4);return chrome.tabs.getZoom(tab.id)},port);
   await page.waitForFunction(()=>innerWidth===320&&devicePixelRatio===4,null,{timeout:5000});
   await page.evaluate(()=>{
    const output=document.querySelector('.rich-inspector output');
    window.__s16EventLatency={samples:[],pending:null};
    document.addEventListener('click',e=>{
      const button=e.target.closest('.rich-inspector button');
      const name=button?.textContent?.trim()||'';
      const match=/^Node (0|1) /.exec(name);
      if(match)window.__s16EventLatency.pending={id:'n'+match[1],start:performance.now()};
    },true);
    new MutationObserver(()=>{
      const p=window.__s16EventLatency.pending;
      if(p&&output.textContent.includes('item: '+p.id)){
       window.__s16EventLatency.samples.push({id:p.id,eventToInspectorMs:Math.round((performance.now()-p.start)*1000)/1000});
       window.__s16EventLatency.pending=null;
      }
    }).observe(output,{childList:true,characterData:true,subtree:true});
   });
   const selections=['n0','n1','n0','n1','n0'];
   for(let i=0;i<selections.length;i++){
     const name=selections[i]==='n0'?/Node 0 System/:/Node 1 Service/;
     await page.locator('.rich-inspector').getByRole('button',{name}).tap({timeout:12000});
     await page.waitForFunction(i=>window.__s16EventLatency?.samples?.length===i+1,i,{timeout:7000});
   }
   await page.locator('.rich-inspector').getByRole('button',{name:/Node 0 System/}).tap();
   await page.getByRole('button',{name:'Pin selected'}).tap();
   await page.waitForFunction(()=>window.__s16rich?.pins?.Overview?.n0?.pinned===true,null,{timeout:4000});
   const data=await page.evaluate(()=>({
     innerWidth,devicePixelRatio,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
     graphWidth:document.querySelector('#rich-graph').clientWidth,
     inspectorWidth:document.querySelector('.rich-inspector').getBoundingClientRect().width,
     nodes:window.__s16rich.nodesCount,edges:window.__s16rich.edgesCount,
     visualZones:document.querySelectorAll('[data-zone]').length,
     selected:window.__s16rich.selected,
     pin:window.__s16rich.pins?.Overview?.n0?.pinned,
     samples:window.__s16EventLatency.samples
   }));
   const item={n,zoom,...data,errors:[...errors]};
   assert.ok(Math.abs(zoom-4)<0.0001,'Chrome tab zoom must equal 400%');assert.equal(item.innerWidth,320);assert.equal(item.devicePixelRatio,4);
   assert.equal(item.overflow,0);assert.equal(item.graphWidth,320);assert.equal(item.nodes,n);assert.equal(item.edges,n*3);
   assert.equal(item.visualZones,3);assert.equal(item.pin,true);assert.ok(item.samples.length>=5);assert.equal(item.errors.length,0);
   report.cases.push(item);console.log('CASE '+JSON.stringify(item));
  }
  const all=report.cases.flatMap(c=>c.samples.map(x=>({n:c.n,...x})));
  const result={...report,passes:report.cases.length,totalEventSamples:all.length};
  fs.mkdirSync('/work/reports',{recursive:true});fs.writeFileSync('/work/reports/richscale-zoom.json',JSON.stringify(result,null,2));
  console.log('SUMMARY '+JSON.stringify({passed:report.cases.length,totalSamples:all.length}));
 }finally{await context?.close();await new Promise(r=>server.close(r));fs.rmSync(tmp,{recursive:true,force:true})}
}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1});
