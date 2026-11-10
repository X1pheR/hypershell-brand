const fs=require('fs'),path=require('path'),http=require('http'),os=require('os'),assert=require('node:assert/strict');const {chromium}=require('/src/family-ui/workbench/node_modules/@playwright/test');
const root='/work/dist',mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(p==='/')p='/index.html';const file=path.resolve(root,'.'+p);if(!file.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(file,(e,d)=>{if(e)return res.writeHead(404).end();res.setHeader('content-type',mime[path.extname(file)]||'application/octet-stream');res.setHeader('Content-Security-Policy-Report-Only',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'");res.end(d)})});
(async()=>{const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'s16-parity-zoom-'));let context,results=[];
try{await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port,port='127.0.0.1:'+server.address().port;const ext=path.join(tmp,'ext');fs.mkdirSync(ext);
fs.writeFileSync(path.join(ext,'manifest.json'),JSON.stringify({manifest_version:3,name:'Research 400-percent Zoom',version:'1.0',permissions:['tabs'],background:{service_worker:'background.js'}}));fs.writeFileSync(path.join(ext,'background.js'),'chrome.runtime.onInstalled.addListener(()=>{})');
context=await chromium.launchPersistentContext(path.join(tmp,'profile'),{headless:true,executablePath:'/ms-playwright/chromium-1247/chrome-linux-arm64/chrome',viewport:{width:1280,height:900},hasTouch:true,args:['--disable-extensions-except='+ext,'--load-extension='+ext]});
await context.route('**/*',r=>r.request().url().startsWith(origin+'/')?r.continue():r.abort());
const page=await context.newPage(),worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker',{timeout:14000});
for(const engine of ['react','cyto']){
 const result={engine,ok:false,errors:[],cspEvents:[]};page.removeAllListeners('pageerror');page.on('pageerror',e=>result.errors.push(e.message));
 try{await page.addInitScript(()=>document.addEventListener('securitypolicyviolation',e=>{(window.__s16CspViolations||(window.__s16CspViolations=[])).push({directive:e.effectiveDirective,blocked:e.blockedURI})}));
 await page.goto(origin+'/?engine=parity-'+engine,{waitUntil:'domcontentloaded',timeout:30000});
 await page.waitForFunction(()=>window.__s16Parity?.ready);
 const zoom=await worker.evaluate(async key=>{const tab=(await chrome.tabs.query({})).find(t=>t.url?.includes(key));if(!tab)throw Error('no local benchmark browser tab');await chrome.tabs.setZoom(tab.id,4);return chrome.tabs.getZoom(tab.id)},port);
 await page.waitForFunction(()=>innerWidth===320&&devicePixelRatio===4,null,{timeout:8000});
 const initial=await page.evaluate(()=>({innerWidth,innerHeight,dpr:devicePixelRatio,pageOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,docScrollHeight:document.documentElement.scrollHeight,graphWidth:document.querySelector('.s16-real-wrapper')?.getBoundingClientRect().width,graphHeight:document.querySelector('.s16-real-wrapper')?.getBoundingClientRect().height,inspectorWidth:document.querySelector('.s16-parity-inspector')?.getBoundingClientRect().width,buttons:document.querySelectorAll('button').length}));
 result.zoom=zoom;result.initial=initial;assert.ok(Math.abs(zoom-4)<.0001);assert.equal(initial.innerWidth,320);assert.equal(initial.dpr,4);
 assert.equal(initial.pageOverflow,0);assert.ok(initial.graphWidth<=320);assert.ok(initial.inspectorWidth<=320);assert.ok(initial.graphHeight>=250);
 await page.getByRole('list',{name:'Map Items'}).getByRole('button',{name:'Reach API'}).tap({timeout:12000});
 await page.waitForFunction(()=>window.__s16Parity?.selected?.id==='api');
 await page.getByRole('button',{name:'Pin',exact:true}).tap();await page.waitForFunction(()=>window.__s16Parity?.pins.api===true);
 await page.getByRole('button',{name:'Reset layout (keep pins)'}).tap();
 await page.waitForFunction(()=>window.__s16Parity?.lastLayout?.kind==='keep-pins'&&!window.__s16Parity.busy,null,{timeout:20000});
 assert.equal((await page.evaluate(()=>window.__s16Parity.pins.api)),true);
 result.touchEmulated='inspector item tap, pin tap, layout tap, retained pin';
 result.cspEvents=await page.evaluate(()=>window.__s16CspViolations||[]);
 assert.equal(result.errors.length,0);
 result.ok=true;
 }catch(e){result.error=String(e.stack||e).slice(0,900)}
 results.push(result);console.log('CASE '+JSON.stringify(result));
}
fs.mkdirSync('/work/reports',{recursive:true});fs.writeFileSync('/work/reports/parity-zoom.json',JSON.stringify({results},null,2));
console.log('SUMMARY '+JSON.stringify({cases:results.length,passed:results.filter(x=>x.ok).length,cspCounts:results.map(x=>({engine:x.engine,count:x.cspEvents.length}))}));
}finally{await context?.close();await new Promise(r=>server.close(r));fs.rmSync(tmp,{recursive:true,force:true})}})().catch(e=>{console.error(e.stack||e);process.exitCode=1});
