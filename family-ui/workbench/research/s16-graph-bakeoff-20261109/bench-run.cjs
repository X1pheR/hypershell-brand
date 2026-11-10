const fs=require('fs'),path=require('path'),http=require('http');
const {chromium}=require('/src/family-ui/workbench/node_modules/@playwright/test');
const root='/work/dist',mode=process.argv[2]||'smoke';
const groups=mode==='smoke'?[100]:mode==='medium'||mode==='acceptance'||mode==='optimized'?[100,500]:[100,500,1500];
const repeats=mode==='smoke'?1:mode==='acceptance'||mode==='optimized'?6:3;const engines=mode==='optimized'?['react','reactopt']:['cyto','react','g6'];
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{const raw0=decodeURIComponent(new URL(req.url,'http://localhost').pathname),raw=raw0==='/'?'/index.html':raw0;const file=path.resolve(root,'.'+raw);if(!file.startsWith(root+path.sep)&&file!==root+'/index.html'){res.writeHead(403).end();return;}
 fs.readFile(file,(e,data)=>{if(e){if(!path.extname(file))return fs.readFile(path.join(root,'index.html'),(e,d)=>{res.setHeader('Content-Type','text/html');res.end(d)});res.writeHead(404).end();return}res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(data)})});
async function main(){await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 let browser;const samples=[];try{
 browser=await chromium.launch({headless:true,executablePath:'/ms-playwright/chromium-1247/chrome-linux-arm64/chrome',args:['--enable-precise-memory-info','--disable-gpu-sandbox']});
 for(const n of groups){for(const engine of engines){for(let rep=0;rep<repeats;rep++){
 const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
 await context.route('**/*',route=>route.request().url().startsWith(origin+'/')?route.continue():route.abort());
 const page=await context.newPage(),errors=[];
 if(mode==='acceptance'||mode==='optimized'){const cdp=await context.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:40,downloadThroughput:2500000,uploadThroughput:2500000});}
 page.on('pageerror',e=>errors.push(String(e.message).slice(0,240)));
 const result={engine,n,edgesRatio:3,rep,warmup:(mode==='acceptance'||mode==='optimized')&&rep===0,throttle:(mode==='acceptance'||mode==='optimized')?'4x-CPU/20mbps/40ms-RTT':'none',ok:false,errors};
 try{
 const start=Date.now();await page.goto(origin+'/?engine='+engine+'&n='+n+'&edges=3',{waitUntil:'domcontentloaded',timeout:30000});
 await page.waitForFunction(()=>window.__s16?.ready||window.__s16?.error,null,{timeout:n>500?90000:35000});
 result.initialMs=Date.now()-start;
 const state=await page.evaluate(()=>window.__s16?.error||null);
 if(state)throw new Error('engine startup: '+state.slice(0,600));
 const checks=await page.evaluate(()=>({nodeCount:window.__s16.nodeCount,edgeCount:window.__s16.edgeCount,engineCounts:window.__s16.engineCounts?.(),domNodes:window.__s16.domNodes?.(),canvasCount:document.querySelectorAll('#graph canvas').length,svgCount:document.querySelectorAll('#graph svg').length,jsHeapMB:performance.memory?.usedJSHeapSize/1048576,scrollOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,windowWidth:innerWidth}));
 Object.assign(result,checks);
 const operations=await page.evaluate(async()=>{
 const s=window.__s16,results={};
 for(const [name,fn] of [['select',s.select],['update',s.update],['pan',s.pan],['layout',s.layout]]){
 if(typeof fn!=='function'){results[name]='UNSUPPORTED';continue}
 try{results[name]=await fn()}catch(e){results[name]='ERROR: '+String(e.message||e)}}return results});
 result.operations=operations;result.selected=await page.evaluate(()=>window.__s16.selected);
 result.ok=errors.length===0 && result.nodeCount===n && result.edgeCount>0&&result.selected==='n0' && Object.values(operations).every(x=>Number.isFinite(x));
 }catch(e){result.failure=String(e.stack||e).slice(0,900)}
 finally{samples.push(result);console.log('SAMPLE '+JSON.stringify(result));await context.close()}
 }}}
 const summary={mode,repeats,groups,samples};
 fs.mkdirSync('/work/reports',{recursive:true});fs.writeFileSync('/work/reports/'+mode+'.json',JSON.stringify(summary,null,2));
 console.log('SUMMARY '+JSON.stringify({samples:samples.length,passes:samples.filter(s=>s.ok).length,failures:samples.filter(s=>!s.ok).map(x=>({engine:x.engine,n:x.n,reason:x.failure||x.operations})),report:'/work/reports/'+mode+'.json'}));
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r))}}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1});
