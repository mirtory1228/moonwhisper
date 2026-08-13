// IndexNow 색인 요청 — 발행/수정 후 실행. Bing·Yandex·네이버 즉시 색인(구글은 미지원).
// 사용법:
//   node scripts/indexnow.mjs                      # sitemap 전체 제출
//   node scripts/indexnow.mjs https://.../a https://.../b   # 특정 URL만
const KEY = 'd0cead6924c99225ff00a4b271097b88';
const HOST = 'www.moonwhispersigns.com';
const SITEMAP = `https://${HOST}/sitemap.xml`;

async function main() {
  let list = process.argv.slice(2);
  if (list.length === 0) {
    const res = await fetch(SITEMAP);
    if (!res.ok) throw new Error(`sitemap 로드 실패: ${res.status}`);
    const xml = await res.text();
    list = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  }
  if (!list.length) { console.log('제출할 URL이 없어요.'); return; }
  list = [...new Set(list)].slice(0, 10000);

  const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: list };
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  console.log(`IndexNow 응답: ${res.status} ${res.statusText} — ${list.length}개 제출`);
  console.log('200/202 = 수락. 실제 색인은 Bing·Yandex 스케줄대로 반영돼요.');
  if (res.status >= 400) console.log('※ 키 파일이 아직 배포 안 됐으면 403 — 배포 후 다시 실행.');
}
main().catch((e) => { console.error('오류:', e.message); process.exit(1); });
