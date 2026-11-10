const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');const {chromium}=require('/src/family-ui/workbench/node_modules/@playwright/test');
const root='/work/dist';const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);p=p==='/'?'/index.html':p;const f=path.resolve(root,'.'+p);if(!f.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(f,(e,b)=>{if(e)return res.writeHead(404).end();res.setHeader('content-type',mime[path.extname(f)]||'application/octet-stream');res.end(b)})});
const full=process.argv[2]==='full',sizes=full?[100,500]:[100],repeats=full?6:1;
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const results=[];
try{browser=await chromium.launch({headless:true,executablePath:'/ms-playwright/chromium-1247/chrome-linux-arm64/chrome'});
for(const n of sizes)for(let rep=0;rep<repeats;rep++){const ctx=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
 const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 if(full){const cdp=await ctx.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:40,downloadThroughput:2500000,uploadThroughput:2500000})}
 const sample={n,rep,warmup:full&&rep===0,ok:false,errors};
 try{const start=Date.now();await page.goto('http://127.0.0.1:'+server.address().port+'/?engine=richscale&n='+n+'&edges=3',{waitUntil:'domcontentloaded'});await page.waitForFunction(expected=>window.__s16rich?.ready&&window.__s16rich.nodesCount===expected,n,{timeout:45000});
 sample.firstReadyMs=Date.now()-start;
 const check=await page.evaluate(()=>({nodes:window.__s16rich.nodes.length,edges:window.__s16rich.edgesCount,groups:window.__s16rich.groups,sites:[...document.querySelectorAll('[data-zone]')].map(e=>e.dataset.zone),heapMiB:performance.memory?.usedJSHeapSize/1048576}));
 assert.equal(check.nodes,n);assert.equal(check.edges,n*3);assert.equal(check.groups.length,2);assert.equal(check.groups[1].parent,'host-home');assert.deepEqual(check.sites,['Home','OCI','Internet']);sample.heapMiB=check.heapMiB;
 const sel=Date.now();await page.locator('.rich-inspector').getByRole('button',{name:/Node 0 System/}).click();await page.waitForFunction(()=>window.__s16rich?.selected?.id==='n0');sample.selectionMs=Date.now()-sel;
 await page.getByRole('button',{name:'Pin selected'}).click();await page.waitForFunction(()=>window.__s16rich?.pins?.Overview?.n0?.pinned===true);const position=await page.evaluate(()=>window.__s16rich.nodes.find(x=>x.id==='n0').pos);
 await page.getByRole('button',{name:'Re-layout'}).click();await page.waitForFunction(()=>window.__s16rich?.nodes.find(x=>x.id==='n0').pinned===true);assert.deepEqual(await page.evaluate(()=>window.__s16rich.nodes.find(x=>x.id==='n0').pos),position);
 await page.getByRole('button',{name:'Deployment'}).click();await page.waitForFunction(()=>window.__s16rich?.projection==='Deployment');await page.getByRole('button',{name:'Overview'}).click();await page.waitForFunction(()=>window.__s16rich?.projection==='Overview');assert.equal((await page.evaluate(()=>window.__s16rich.nodes.find(x=>x.id==='n0').pinned)),true);
 await page.getByRole('button',{name:'Reset projection'}).click();await page.waitForFunction(()=>window.__s16rich?.nodes.find(x=>x.id==='n0').pinned===false);
 const upd=Date.now();await page.getByRole('button',{name:'Update 50 statuses'}).click();await page.waitForFunction(()=>window.__s16rich?.nodes.find(x=>x.id==='n0')?.status==='warning',null,{timeout:25000});sample.update50Ms=Date.now()-upd;
 await page.locator('.rich-inspector').getByRole('button',{name:'e0',exact:true}).click();await page.waitForFunction(()=>window.__s16rich?.selected?.kind==='relationship'&&window.__s16rich?.selected?.id==='e0');
 await page.setViewportSize({width:320,height:844});await page.waitForTimeout(100);
 sample.narrow=await page.evaluate(()=>({w:innerWidth,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,graph:document.getElementById('rich-graph').clientWidth}));
 assert.ok(sample.narrow.overflow<=1,'horizontal overflow '+sample.narrow.overflow);assert.equal(errors.length,0);sample.ok=true;
 }catch(e){sample.failure=String(e.stack||e).slice(0,900)}finally{results.push(sample);console.log('SAMPLE '+JSON.stringify(sample));await ctx.close()}
}
fs.mkdirSync('/work/reports',{recursive:true});fs.writeFileSync('/work/reports/'+(full?'richscale':'richscale-smoke')+'.json',JSON.stringify({repeats,sizes,results},null,2));
console.log('SUMMARY '+JSON.stringify({total:results.length,passed:results.filter(x=>x.ok).length,failed:results.filter(x=>!x.ok).length}));
}finally{await browser?.close();await new Promise(r=>server.close(r))}})().catch(e=>{console.error(e.stack||e);process.exitCode=1});
