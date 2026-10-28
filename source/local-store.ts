import {localRequest as demoRequest} from './demo-store';
import {staticRequest} from './static-store';
declare const __STATIC_SITE__:boolean|undefined;
// GitHub Pages build: no server, data comes from JSON files written by the collector workflow.
export const staticSite=typeof __STATIC_SITE__!=='undefined'&&__STATIC_SITE__===true;
export const serverMode=!staticSite&&typeof location!=='undefined'&&/^https?:$/.test(location.protocol);
export async function localRequest(url:string,options?:any){if(staticSite)return staticRequest(url,options);if(serverMode)return fetch(url,{...options,credentials:'same-origin'});return demoRequest(url,options)}
