const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict');
const {chromium}=require('/src/family-ui/workbench/node_modules/@playwright/test');
const root='/work/dist',mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
const mode=process.argv[2]||'smoke',repeats=mode==='full'?3:1;
const server=http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(p==='/')p='/index.html';
const file=path.resolve(root,'.'+p);if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
fs.readFile(file,(e,data)=>{if(e)return res.writeHead(404).end();res.setHeader('content-type',mime[path.extname(file)]||'application/octet-stream');res.end(data)})});
const measure=()=>Date.now();
async function act(page,button){await page.getByRole('button',{name:button,exact:true}).click()}
async function verify(page,expr,message){
const b=await page.evaluate(expr);assert.ok(b,message+' '+String(b));return b}
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 let browser;const samples=[];try{
 browser=await chromium.launch({headless:true,executablePath:'/ms-playwright/chromium-1247/chrome-linux-arm64/chrome'});
 for(const engine of ['react','cyto'])for(let rep=0;rep<repeats;rep++){
 const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
 await context.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:'+server.address().port+'/')?r.continue():r.abort());
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const result={engine,rep,checks:[],ok:false,errors};
 try{
 let t=measure();
 await page.goto('http://127.0.0.1:'+server.address().port+'/?engine=parity-'+engine,{waitUntil:'domcontentloaded',timeout:30000});
 await page.waitForFunction(()=>window.__s16Parity?.ready&&window.__s16Parity?.itemIDs.length===12,{timeout:35000});
 result.readyMs=measure()-t;
 let initial=await page.evaluate(()=>window.__s16Parity);assert.equal(initial.itemIDs.length,12);assert.equal(initial.relationshipIDs.length,14);result.checks.push('canonical identity 12 Items 14 Relationships');
 assert.deepEqual((await page.locator('[data-site]').allTextContents()).length,3);
 await page.getByRole('list',{name:'Map Items'}).getByRole('button',{name:'HomeSight UI'}).click();
 await page.waitForFunction(()=>window.__s16Parity?.selected?.id==='ui');result.checks.push('select item from accessible Inventory list');
 let output=await page.getByTestId('selection').textContent();assert.equal(output,'item: ui');
 await act(page,'Pin');await page.waitForFunction(()=>window.__s16Parity?.pins?.ui===true);
 let pinPosition=await page.evaluate(()=>window.__s16Parity.positions.ui);
 await act(page,'Network');await page.waitForFunction(()=>window.__s16Parity?.projection==='Network');
 assert.deepEqual((await page.evaluate(()=>window.__s16Parity.itemIDs)).sort(),['lan','vpn'].sort());
 await act(page,'Overview');await page.waitForFunction(()=>window.__s16Parity?.projection==='Overview');
 await verify(page,()=>window.__s16Parity?.pins.ui===true,'projection-local pin retained');result.checks.push('6-projection switch and retained pin');
 await page.getByRole('searchbox',{name:'Map Search'}).fill('Reach API');
 await page.waitForFunction(()=>window.__s16Parity?.itemIDs.length===1&&window.__s16Parity.itemIDs[0]==='api');
 assert.equal((await page.evaluate(()=>window.__s16Parity.positions.ui.x)),pinPosition.x);result.checks.push('filter selection preserves position');
 await page.getByRole('searchbox',{name:'Map Search'}).fill('');
 await page.waitForFunction(()=>window.__s16Parity?.itemIDs.length===12);
 t=measure();await act(page,'Reset layout (keep pins)');
 await page.waitForFunction(()=>window.__s16Parity?.lastLayout?.kind==='keep-pins'&&!window.__s16Parity.busy,null,{timeout:24000});
 result.layoutMs=measure()-t;
 assert.equal((await page.evaluate(()=>window.__s16Parity?.pins.ui)),true);
 const newPosition=await page.evaluate(()=>window.__s16Parity.positions.ui);
 assert.ok(Math.abs(newPosition.x-pinPosition.x)<.001&&Math.abs(newPosition.y-pinPosition.y)<.001,'fCoSE must preserve native pin');
 result.checks.push('actual native fCoSE reset layout keeps pins');
 await act(page,'Reset all positions');await page.waitForFunction(()=>window.__s16Parity?.lastLayout?.kind==='reset-all'&&!window.__s16Parity.busy,null,{timeout:24000});
 await verify(page,()=>Object.values(window.__s16Parity.pins).every(x=>!x),'reset all clears pins');result.checks.push('reset all positions clears pin state');
 await page.getByRole('list',{name:'Map Items'}).getByRole('button',{name:'HomeSight UI'}).click();
 await page.getByRole('list',{name:'Map Items'}).getByRole('button',{name:'Reach API'}).click({modifiers:['Control']});
 await page.waitForFunction(()=>window.__s16Parity?.multi?.includes('ui')&&window.__s16Parity?.multi?.includes('api'));
 await page.keyboard.press('Escape');await page.waitForFunction(()=>window.__s16Parity?.multi?.length===0&&window.__s16Parity?.selected===null);
 result.checks.push('Ctrl multi-select via accessible list, Escape clears');
 await page.getByRole('list',{name:'Map Relationships'}).getByRole('button',{name:'e2: calls'}).click();
 await page.waitForFunction(()=>window.__s16Parity?.selected?.id==='e2');
 assert.ok((await page.getByRole('region').allTextContents()).some(x=>x.includes('api → ui'))||await page.getByRole('complementary').getByText('api → ui (canonical direction)').isVisible());
 result.checks.push('canonical directed relation inspector');
 await page.getByRole('searchbox',{name:'Map Search'}).fill('no-match-123');
 await page.getByRole('status').filter({hasText:'No current Inventory facts'}).waitFor({timeout:6000});
 await page.getByRole('searchbox',{name:'Map Search'}).fill('');
 await page.waitForFunction(()=>window.__s16Parity?.itemIDs.length===12);result.checks.push('truthful empty and restored Map');
 await page.setViewportSize({width:320,height:844});await page.waitForTimeout(140);
 const reflow=await page.evaluate(()=>({innerWidth,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,graph:document.querySelector('.s16-real-wrapper').getBoundingClientRect().width,inspector:document.querySelector('.s16-parity-inspector').getBoundingClientRect().width,controls:document.querySelectorAll('.s16-parity-bar button').length}));
 result.reflow=reflow;assert.ok(reflow.overflow<=1,'horizontal page overflow '+reflow.overflow);
 assert.ok(reflow.inspector<=320&&reflow.graph<=320);result.checks.push('320 CSS-pixel reflow');
 if(errors.length)throw new Error('page errors: '+JSON.stringify(errors));
 result.ok=true;
 }catch(e){result.error=String(e.stack||e).slice(0,1300)}
 finally{samples.push(result);console.log('CASE '+JSON.stringify(result));await context.close()}
 }
 fs.mkdirSync('/work/reports',{recursive:true});
 fs.writeFileSync('/work/reports/parity-'+mode+'.json',JSON.stringify({mode,repeats,samples},null,2));
 console.log('SUMMARY '+JSON.stringify({cases:samples.length,passing:samples.filter(x=>x.ok).length,failing:samples.filter(x=>!x.ok).map(x=>({engine:x.engine,error:x.error?.slice(0,280)}))}));
 }finally{await browser?.close();await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e.stack||e);process.exitCode=1});
