# 공식 데이터 연결 근거
확인일: 2026-10-28

진입 페이지: https://algs.ea.com/en/championship-points
해당 페이지의 공개 JavaScript에서 확인:
- /_next/static/chunks/356_028g3dtm8.js?dpl=d12e2f1 : base URL 및 seasons/structure, stats/phases/{id}/standings, seasons/{id}/standings/teams
- /_next/static/chunks/34cn8znaorpp8.js?dpl=d12e2f1 : Year 6 season ID, minAmountOfMatches=12 및 eventIds 필터, 챔피언십 페이지 표시 방식

확인한 응답 경로:
https://prod-api.algstools.com/v1/seasons/structure
https://prod-api.algstools.com/v1/stats/phases/01KTHV7NG27AWPPRVE0TN52CA1/standings
https://prod-api.algstools.com/v1/seasons/01KEAJYDXP9CBK44PPW7XWDNB3/standings/teams?minAmountOfMatches=12&eventIds=01KTHV6YD6XFMQ1W7CZXBN9H0P,01KTHV7NFZ7BX8VND276ZS2CSA,01KTHV7V10NX9HB8S1WM7QT6Q9,01KPPFPQYTBGN1PYMGQ3CDNZHM

번들 파일명은 공식 배포마다 바뀔 수 있습니다. 서버는 매 수집 시 번들을 다운로드하거나 실행하지 않고 확인된 JSON 경로만 사용합니다. 사이트 소유권·이용 허가·API 안정성에 대한 추가적인 보장을 의미하지 않습니다.
