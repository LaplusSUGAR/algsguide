// Collects standings from the same public data that algs.ea.com itself uses (see server/ea.mjs).
// Writes site-data/live.json. On a failed fetch the previous good result is kept and marked as an error.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {fetchEAStructure,fetchEARegion,fetchEAChampionship,REGIONS} from '../server/ea.mjs';
const file=process.env.LIVE_JSON_PATH||path.join(path.dirname(fileURLToPath(import.meta.url)),'../site-data/live.json');
let prev={};try{prev=JSON.parse(fs.readFileSync(file,'utf8'))}catch{}
const env=process.env,now=Date.now();
const out={schema:1,generatedAt:new Date(now).toISOString(),regions:{...(prev.regions||{})},regionErrors:{},championship:prev.championship||null,championshipError:null,structureError:null};
const err=e=>({message:String(e?.message||e),at:new Date(now).toISOString()});
let ok=0,total=0,structure=null;
try{structure=await fetchEAStructure()}catch(e){out.structureError=err(e);console.error('structure:',e.message)}
if(structure){
  for(const region of REGIONS){total++;try{out.regions[region]=await fetchEARegion(structure,region,env);ok++}catch(e){out.regionErrors[region]=err(e);console.error(region+':',e.message)}}
  total++;try{out.championship=await fetchEAChampionship(structure,env);ok++}catch(e){out.championshipError=err(e);console.error('championship:',e.message)}
}else total=1;
const same=JSON.stringify({...out,generatedAt:0})===JSON.stringify({...prev,generatedAt:0});
if(!same||!prev.generatedAt){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,JSON.stringify(out,null,1)+'\n')}
console.log(`collected ${ok}/${total}`+(same?' (no change)':''));
if(ok===0)process.exit(1);
