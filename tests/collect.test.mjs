import test from 'node:test';import assert from 'node:assert/strict';import {mkdtempSync,rmSync,readFileSync,existsSync} from 'node:fs';import os from 'node:os';import path from 'node:path';import {spawnSync} from 'node:child_process';
const run=(file,mode)=>spawnSync(process.execPath,['--import','./tests/mock-fetch.mjs','scripts/collect.mjs'],{env:{...process.env,LIVE_JSON_PATH:file,MOCK_MODE:mode},encoding:'utf8'});
test('collector writes official standings and keeps last good data on failure',()=>{const dir=mkdtempSync(path.join(os.tmpdir(),'dz-collect-'));const f=path.join(dir,'live.json');try{
 let r=run(f,'ok');assert.equal(r.status,0,r.stderr);let d=JSON.parse(readFileSync(f,'utf8'));assert.equal(d.regions['APAC North'].teams[0].points,120);assert.equal(d.championship.teams[0].points,300);assert.match(d.regions['APAC North'].source,/algs\.ea\.com/);
 r=run(f,'phase-fail');d=JSON.parse(readFileSync(f,'utf8'));assert.equal(d.regions['APAC North'].teams[0].points,120,'previous data kept');assert.ok(d.regionErrors['APAC North'].message);assert.equal(d.championship.teams[0].points,300);
 const r2=run(path.join(dir,'none.json'),'all-fail');assert.equal(r2.status,1);assert.ok(!existsSync(path.join(dir,'none.json'))||JSON.parse(readFileSync(path.join(dir,'none.json'),'utf8')).structureError)
}finally{rmSync(dir,{recursive:true,force:true})}});
