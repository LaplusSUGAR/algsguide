# algsguide (DROPZONE · 한국 ALGS 커뮤니티)

GitHub Pages로 운영하는 정적 사이트입니다. 서버 없이 동작하며, 순위 데이터는 GitHub Actions가 **algs.ea.com 공식 사이트가 사용하는 공개 데이터**에서 약 10분 간격으로 수집합니다. 다른 점수 공급자(ALS 등)는 사용하지 않습니다.

## 처음 한 번만 설정
1. 저장소 **Settings → Pages → Build and deployment → Source: GitHub Actions** 로 선택합니다.
2. **Actions** 탭에서 `Collect data and deploy site`를 `Run workflow`로 한 번 실행합니다.
3. 몇 분 뒤 `https://<계정>.github.io/algsguide/` 에서 사이트를 확인합니다.

## 구조
| 경로 | 역할 |
|---|---|
| `.github/workflows/pages.yml` | 10분마다 수집 → 빌드 → Pages 배포 |
| `scripts/collect.mjs` | 공식 순위 수집, `site-data/live.json` 생성 (실패 시 마지막 정상 데이터 유지) |
| `server/ea.mjs` | 공식 데이터 경로와 변환 로직 (공식 경로 외 호출 차단) |
| `content/content.json` | 공지·일정·채널·FAQ (직접 수정하고 커밋) |
| `source/` | 화면 소스 (React/TypeScript). `node source/build.mjs --pages` 로 `dist/` 생성 |
| `docs/SERVER-MODE.md`, `server/` | 서버 버전(SQLite, 익명 Q&A, 관리자, 푸시). Pages에서는 사용하지 않음 |

## GitHub Pages 버전에서 제공하지 않는 기능
정적 호스팅이라 익명 질문 작성, 관리자 로그인, 웹 푸시, YouTube/치지직/X 방송 자동 감지는 동작하지 않습니다. 이 기능이 필요하면 `docs/SERVER-MODE.md`의 서버 버전을 별도 서버에 배포해야 합니다.

## 주의
- 공식 데이터 경로(`prod-api.algstools.com/v1`)는 algs.ea.com 페이지가 쓰는 공개 응답이며, 장기 제공이나 형식 유지를 보장하지 않습니다. 변경되면 수집이 실패하고 화면에 마지막 정상 데이터와 오류가 표시됩니다.
- GitHub 예약 실행은 지연되거나 건너뛸 수 있어 초 단위 실시간이 아닙니다.
- 팬이 만든 독립 사이트이며 EA·Respawn과 제휴 관계가 아닙니다.
