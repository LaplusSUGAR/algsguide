import {existsSync,writeFileSync} from 'node:fs';
import {randomBytes,createECDH} from 'node:crypto';
import {hashPassword} from './server/core.mjs';
if(existsSync('.env')){console.error('.env가 이미 있습니다. 기존 설정을 덮어쓰지 않았습니다.');process.exit(1)}
const password=randomBytes(18).toString('base64url');const hash=await hashPassword(password);const curve=createECDH('prime256v1');curve.generateKeys();
writeFileSync('.env',`HOST=127.0.0.1\nPORT=3000\nPUBLIC_ORIGIN=http://localhost:3000\nADMIN_PASSWORD_HASH=${hash}\nYOUTUBE_API_KEY=\nYOUTUBE_DAILY_SEARCH_BUDGET=90\nYOUTUBE_POLL_MINUTES=30\nCHZZK_CLIENT_ID=\nCHZZK_CLIENT_SECRET=\nCHZZK_MAX_PAGES=20\nX_BEARER_TOKEN=\nEA_SEASON_ID=\nEA_EVENT_APAC_NORTH=\nEA_EVENT_GLOBAL=\nVAPID_PUBLIC_KEY=${curve.getPublicKey().toString('base64url')}\nVAPID_PRIVATE_KEY=${curve.getPrivateKey().toString('base64url')}\nVAPID_SUBJECT=\n`,{mode:0o600});console.log('설정 완료. 관리자 비밀번호를 안전하게 보관하세요. 다시 표시되지 않습니다.\n\n'+password+'\n\n실행: npm start\n주소: http://localhost:3000\nAPI 키는 .env에서 설정합니다. .env를 공유하지 마세요.');
