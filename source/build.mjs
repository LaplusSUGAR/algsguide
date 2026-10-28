import {build} from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const repo=path.join(root,'..');
const pages=process.argv.includes('--pages');
const result=await build({entryPoints:[path.join(root,'main.tsx')],bundle:true,write:false,minify:true,format:'iife',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"','__STATIC_SITE__':pages?'true':'false'},legalComments:'inline'});
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');const js=result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script');
const title=pages?'DROPZONE — 한국 ALGS 커뮤니티':'DROPZONE — 로컬 HTML';
const html=`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>${css}</style></head><body><div id="root"></div><noscript>JavaScript를 활성화해 주세요.</noscript><script>${js}</script></body></html>`;
if(pages){
  // GitHub Pages output: dist/index.html + dist/data/*.json (collector output and hand-edited content)
  const out=path.join(repo,'dist');fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(path.join(out,'data'),{recursive:true});
  fs.writeFileSync(path.join(out,'index.html'),html);fs.writeFileSync(path.join(out,'.nojekyll'),'');
  for(const [src,name] of [['site-data/live.json','live.json'],['content/content.json','content.json']]){const f=path.join(repo,src);if(fs.existsSync(f))fs.copyFileSync(f,path.join(out,'data',name));else console.warn('missing',src)}
  console.log('Built dist/ for GitHub Pages');
}else{
  fs.mkdirSync(path.join(repo,'website'),{recursive:true});fs.writeFileSync(path.join(repo,'website/index.html'),html);console.log('Built website/index.html');
}
