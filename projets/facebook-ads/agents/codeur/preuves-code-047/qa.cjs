const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.env.CODE047_FRONTEND||path.join(__dirname,'frontend'),out=process.env.CODE047_PROOFS||path.join(__dirname,'proofs');fs.mkdirSync(out,{recursive:true});
const campaign={id:'200',campaign_id:'200',name:'Campagne Paris',campaign_name:'Campagne Paris',status:'ACTIVE',daily_budget:'1000',spend:'388.53',impressions:'20000',clicks:'1150',leads:36,actions:[{action_type:'lead',value:'36'}]};
const old={id:'100',campaign_id:'100',name:'Campagne remplacée',status:'PAUSED',spend:'0'};
const ads=[{id:'2',name:'Annonce 2',campaign_id:'200',campaign_name:'Campagne Paris',adset_id:'400',adset_name:'Ensemble Paris',status:'ACTIVE',effective_status:'IN_PROCESS',metrics:{spend:381.54,leads:36,clicks:1130,impressions:19400,cpl:10.6}},
{id:'3',name:'Extension maison en IDF',campaign_id:'200',campaign_name:'Campagne Paris',adset_id:'400',status:'ARCHIVED',effective_status:'ARCHIVED',read_only:true,metrics:{spend:6.99,leads:0,clicks:20,impressions:600,cpl:null}}];
const server=http.createServer((req,res)=>{
 const name=new URL(req.url,'http://fixture.test').pathname;
 if(name==='/js/config.js'){res.setHeader('Content-Type','text/javascript');return res.end("var BACKEND_URL=location.origin;var DASHBOARD_API_KEY='fixture';function getAuthHeaders(){return {'x-api-key':'fixture'}}");}
 const file=path.join(root,name==='/'?'index.html':name);
 if(!file.startsWith(root)||!fs.existsSync(file)){res.statusCode=404;return res.end('Not found');}
 res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'text/plain');res.end(fs.readFileSync(file));
});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const portable=require(process.env.CODE047_CHROMIUM||'./qa-runtime/node_modules/@sparticuz/chromium');const browser=await chromium.launch({executablePath:await portable.executablePath(),headless:true,args:portable.args});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},locale:'fr-FR'}),errors=[],reads=[],writes=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{window.Chart=class { static register(){};destroy(){};update(){} };});
 await page.addInitScript(()=>{const D=Date;window.Date=class extends D{constructor(...a){super(...(a.length?a:['2026-11-15T08:25:00Z']));}static now(){return D.parse('2026-11-15T08:25:00Z');}};localStorage.setItem('mpr.dashboardCampaignId','100');});
 await page.route('https://**',route=>{const u=route.request().url();if(u.includes('chart.js'))return route.fulfill({contentType:'text/javascript',body:"window.Chart=class{static register(){};destroy(){};update(){}};"});return route.fulfill({status:200,body:''});});
 await page.route('**/api/**',async route=>{
  const req=route.request(),url=new URL(req.url());if(req.method()!=='GET'){writes.push({method:req.method(),path:url.pathname,mocked:true});return route.fulfill({json:{success:true,data:{},prompt:'Fixture de recette locale'}});}
  reads.push({path:url.pathname,query:Object.fromEntries(url.searchParams)});let body={success:true,data:[]};
  const p=url.pathname;
  if(p==='/api/facebook/campaigns')body={success:true,data:[old,campaign]};
  else if(p==='/api/facebook/account')body={success:true,data:{name:'Mistral Pro Reno',currency:'EUR',account_status:1}};
  else if(p==='/api/facebook/insights')body={success:true,data:{...campaign,ctr:'5.75',reach:'12000',frequency:'1.67',cpc:'0.34'}};
  else if(p==='/api/facebook/insights/campaigns')body={success:true,data:[old,campaign]};
  else if(p==='/api/facebook/ads/filters')body={success:true,campaigns:[old,campaign],adsets:[{id:'400',name:'Ensemble Paris',campaign_id:'200',status:'ACTIVE'}]};
  else if(p==='/api/facebook/ads/details')body={success:true,ads,totals:{spend:388.53,leads:36},time_range:{since:'2026-10-17',until:'2026-11-15'}};
  else if(p.endsWith('/strategy'))body={success:true,strategy:'CBO',campaign:{...campaign,budget_euros:10,budget_type:'daily'},adsets:[]};
  else if(p.startsWith('/api/facebook/campaigns/'))body={success:true,data:campaign};
  else if(p.includes('business-context'))body={success:true,data:{reduction_mode:false,flagged_ads:[]}};
  else if(p.includes('latest')||p.includes('last-analysis'))body={success:false};
  return route.fulfill({json:body});
 });
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'networkidle'});
 await page.evaluate(()=>{const badge=document.createElement('div');badge.textContent='RECETTE LOCALE — DONNÉES SIMULÉES';badge.style.cssText='position:fixed;left:8px;bottom:8px;padding:7px 10px;background:#fff;color:#000;font:12px sans-serif;z-index:999999;border:1px solid #000';document.body.appendChild(badge);});
 await page.selectOption('#periodSelect','last_30d');await page.waitForFunction(()=>document.getElementById('cockpitCampaignName').textContent==='Campagne Paris');
 await page.waitForFunction(()=>document.getElementById('kpiSpend').textContent.includes('388'));
 await page.screenshot({path:path.join(out,'cockpit-1440.png'),fullPage:true});
 await page.locator('[data-view="adsmanager"]').click();await page.waitForFunction(()=>document.querySelectorAll('#ads-table-body tr[data-ad-id]').length===2);
 const historic=page.locator('#ads-table-body tr[data-ad-id="3"]');if(await historic.locator('button,input').count())throw Error('Historical controls rendered');
 await page.setViewportSize({width:1920,height:1080});await page.screenshot({path:path.join(out,'ads-1920.png'),fullPage:true});
 await page.selectOption('#periodSelect','custom');await page.fill('#customDateSince','2026-10-17');await page.fill('#customDateUntil','2026-11-15');await page.locator('.btn-custom-apply').click();
 await page.waitForFunction(()=>document.querySelectorAll('#ads-table-body tr[data-ad-id]').length===2);
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,'ads-390.png'),fullPage:true});
 const fixed=reads.filter(r=>r.path==='/api/facebook/ads/details');if(!fixed.some(r=>r.query.since==='2026-10-17'&&r.query.until==='2026-11-15'))throw Error('Fixed report period not requested');
 fs.writeFileSync(path.join(out,'qa.json'),JSON.stringify({source:'candidate local avec API simulée, aucune donnée de production',errors,writes,details_requests:fixed,campaign_name:await page.locator('#cockpitCampaignName').textContent(),historical_button_count:await historic.locator('button,input').count()},null,2));
 console.log(JSON.stringify({errors,writes,details_requests:fixed.length,screenshots:3}));
 if(errors.length||writes.some(w=>w.path.startsWith('/api/facebook/')))process.exitCode=1;
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e.message);server.close();process.exitCode=1;});
