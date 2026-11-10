const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict');
const {chromium}=require('/src/family-ui/workbench/node_modules/@playwright/test');
const root='/work/dist';
const server=http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(p==='/')p='/index.html';let file=path.resolve(root,'.'+p);if(!file.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(file,(e,d)=>{if(e)return res.writeHead(404).end();res.setHeader('content-type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(d)})});
async function locate(page,engine,id){
 if(engine==='react'){let box=await page.locator('.react-flow__node[data-id="'+id+'"]').boundingBox();if(!box)throw Error('no React Flow DOM node '+id);return{x:box.x+box.width/2,y:box.y+box.height/2}}
 return await page.evaluate(id=>{const cy=window.__s16ParityCy;if(!cy)throw Error('cytoscape not initialized');const pos=cy.getElementById(id).renderedPosition(),b=cy.container().getBoundingClientRect();return{x:b.left+pos.x,y:b.top+pos.y}},id);
}
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;let all=[];
try{browser=await chromium.launch({headless:true,executablePath:'/ms-playwright/chromium-1247/chrome-linux-arm64/chrome'});
for(const engine of ['react','cyto']){
 const ctx=await browser.newContext({viewport:{width:1280,height:900}});const page=await ctx.newPage();let result={engine,ok:false,checks:[],errors:[]};
 page.on('pageerror',e=>result.errors.push(e.message));
 try{await page.goto('http://127.0.0.1:'+server.address().port+'/?engine=parity-'+engine);
 await page.waitForFunction(()=>window.__s16Parity?.ready&&window.__s16Parity?.itemIDs.length===12);
 const p=await locate(page,engine,'api');const original=await page.evaluate(()=>window.__s16Parity.positions.api);
 result.hit=p;await page.mouse.click(p.x,p.y);await page.waitForFunction(()=>window.__s16Parity?.selected?.id==='api',null,{timeout:4000});
 result.checks.push('real pointer directly selected graph node');
 await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x+74,p.y+40,{steps:9});await page.mouse.up();
 await page.waitForFunction(()=>window.__s16Parity?.pins.api===true,null,{timeout:4000});
 const after=await page.evaluate(()=>window.__s16Parity.positions.api);
 result.afterDrag=await page.evaluate(()=>({multi:window.__s16Parity.multi,selected:window.__s16Parity.selected}));
 result.drag={dx:Math.round(after.x-original.x),dy:Math.round(after.y-original.y)};
 assert.ok(Math.hypot(after.x-original.x,after.y-original.y)>6,'drag must move canonical view position');
 result.checks.push('actual pointer drag automatically pins moved graph item');
 const now=await locate(page,engine,'bridge');
 result.ctrlTarget={point:now,hit:await page.evaluate(p=>{const v=document.elementFromPoint(p.x,p.y);return (v?.outerHTML||'').slice(0,220)},now)};
 await page.keyboard.down('Control');await page.mouse.click(now.x,now.y);await page.keyboard.up('Control');
 await page.waitForTimeout(200);
 result.afterCtrl=await page.evaluate(()=>({multi:window.__s16Parity?.multi,selected:window.__s16Parity?.selected}));
 assert.ok(result.afterCtrl.multi?.includes('api')&&result.afterCtrl.multi?.includes('bridge'),'Direct Ctrl-select did not preserve both selected items');
 result.checks.push('Ctrl modifier multi-select directly on graph');
 const beforeGroup=await page.evaluate(()=>({api:window.__s16Parity.positions.api,bridge:window.__s16Parity.positions.bridge}));
 const groupHit=await locate(page,engine,'bridge');
 await page.mouse.move(groupHit.x,groupHit.y);await page.mouse.down();await page.mouse.move(groupHit.x+55,groupHit.y+30,{steps:8});await page.mouse.up();
 await page.waitForFunction(before=>window.__s16Parity?.pins.api===true&&window.__s16Parity?.pins.bridge===true&&
  Math.hypot(window.__s16Parity.positions.bridge.x-before.bridge.x,window.__s16Parity.positions.bridge.y-before.bridge.y)>5,beforeGroup,{timeout:4000});
 const afterGroup=await page.evaluate(()=>({api:window.__s16Parity.positions.api,bridge:window.__s16Parity.positions.bridge}));
 const da={x:afterGroup.api.x-beforeGroup.api.x,y:afterGroup.api.y-beforeGroup.api.y};
 const db={x:afterGroup.bridge.x-beforeGroup.bridge.x,y:afterGroup.bridge.y-beforeGroup.bridge.y};
 result.groupDrag={da,db};
 assert.ok(Math.hypot(da.x,da.y)>5,'group-selected companion node should move');
 assert.ok(Math.abs(da.x-db.x)<2&&Math.abs(da.y-db.y)<2,'group drag must preserve relative positions');
 result.checks.push('real pointer group drag preserves relative positions and pins both');
 await page.keyboard.press('Escape');await page.waitForFunction(()=>window.__s16Parity?.multi.length===0);
 result.checks.push('Escape clears direct graph selection');
 if(result.errors.length)throw Error(JSON.stringify(result.errors));result.ok=true;
 }catch(e){result.failure=String(e.stack||e).slice(0,650)}
 finally{all.push(result);console.log('CASE '+JSON.stringify(result));await ctx.close()}
}
fs.mkdirSync('/work/reports',{recursive:true});fs.writeFileSync('/work/reports/parity-pointer.json',JSON.stringify({results:all},null,2));
console.log('SUMMARY '+JSON.stringify({total:all.length,pass:all.filter(x=>x.ok).length}));
}finally{await browser?.close();await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e.stack||e);process.exitCode=1});
