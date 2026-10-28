const reply=(data:any,status=200)=>({ok:status<400,json:async()=>data});
async function load(name:string){const r=await fetch('./data/'+name+'?t='+Math.floor(Date.now()/60000),{cache:'no-store'});if(!r.ok)throw Error(name+' '+r.status);return r.json()}
export async function loadLive():Promise<any>{return load('live.json')}
// Read-only: content is edited in the repository (content/content.json), not in the browser.
export async function staticRequest(url:string,options?:any){
 if(options&&options.method==='POST')return reply({error:'GitHub Pages 버전은 읽기 전용입니다. 공지·일정·채널은 저장소의 content/content.json에서 수정합니다.'},403);
 try{
  if(url.startsWith('/api/content')){let items:any[]=[];try{const d=await load('content.json');items=Array.isArray(d.items)?d.items:[]}catch{}return reply({items,admin:false,setup:false})}
  if(url.startsWith('/api/live')){const region=new URLSearchParams(url.split('?')[1]||'').get('region')||'APAC North';const d=await loadLive();const r=d.regions?.[region];const err=d.regionErrors?.[region]||d.structureError;if(!r)return reply({error:err?.message||'공식 사이트 첫 수집 대기',stale:true,collectionError:err||null});return reply({...r,stale:Date.now()-Date.parse(d.generatedAt)>1800000,collectionError:err||null})}
 }catch{return reply({error:'수집된 데이터 파일을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.'},503)}
 return reply({error:'지원하지 않는 요청입니다.'},404)}
