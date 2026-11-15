const fs=require('fs'), vm=require('vm'), assert=require('assert/strict'), crypto=require('crypto');
const root=__dirname;
function routes(source) {
 const writes=[];const router={get(){},post:(path,...h)=>writes.push({method:'POST',path,handlers:h.map(f=>f.toString())}),delete:(path,...h)=>writes.push({method:'DELETE',path,handlers:h.map(f=>f.toString())})};
 vm.runInNewContext(source,{module:{exports:{}},require:name=>name==='express'?{Router:()=>router}:name.includes('cache')?{cacheMiddleware:()=>()=>{}}:{},console:{log(){},error(){}}}); return writes;
}
function methods(source) {
 const c={module:{exports:{}},process:{env:{}},console:{log(){},error(){}},require:()=>({})};vm.runInNewContext(source,c);
 return Object.fromEntries(Object.getOwnPropertyNames(Object.getPrototypeOf(c.module.exports)).filter(k=>!['constructor','request','getAdsWithDetails'].includes(k)).map(k=>[k,c.module.exports[k].toString()]));
}
const previousRoutes=routes(fs.readFileSync(root+'/original-campaigns.js','utf8')), currentRoutes=routes(fs.readFileSync(root+'/backend/routes/campaigns.js','utf8'));
assert.deepEqual(currentRoutes,previousRoutes);
const previousMethods=methods(fs.readFileSync(root+'/original-facebook-api.js','utf8')),currentMethods=methods(fs.readFileSync(root+'/backend/services/facebook-api.js','utf8'));assert.deepEqual(currentMethods,previousMethods);
const report={comparison:'original main 3db9c13 vs CODE-047 reprise 1',write_routes:currentRoutes.map(({method,path})=>({method,path})),unchanged_write_route_count:currentRoutes.length,unchanged_service_method_count:Object.keys(currentMethods).length,request_change:'Optional safeReportingLog only for GET; POST paths unchanged',sha256_write_handlers:crypto.createHash('sha256').update(JSON.stringify(currentRoutes)).digest('hex')};
fs.writeFileSync(root+'/proofs/write-scope-reprise.json',JSON.stringify(report,null,2)+'\n');console.log(report);
