// content/posts/*.md 파일을 읽어 글 목록/본문을 제공합니다.
// 빌드 시점에 서버에서 실행되어 각 글이 정적 HTML로 생성됩니다(SEO 최적).

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export function getAllSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

// 프론트매터(메타)만 읽어 목록용 데이터 반환
export function getPostMeta(slug) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf-8');
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: data.date ?? '',
    updated: data.updated ?? data.date ?? '',
    category: data.category ?? '기타',
    sign: data.sign ?? null,
    keywords: data.keywords ?? [],
    image: data.image ?? null,
    // AI 인용·리치결과용: tldr 없으면 description을 답변형 요약으로 폴백(전 글 소급 적용)
    tldr: data.tldr ?? data.description ?? '',
    // FAQPage 스키마용 Q&A (프론트매터 faq: [{q,a}]). 없으면 빈 배열.
    faq: Array.isArray(data.faq)
      ? data.faq.filter((f) => f && f.q && f.a).map((f) => ({ q: String(f.q), a: String(f.a) }))
      : [],
  };
}

// 제목 텍스트 → URL 앵커용 slug
function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// 본문(HTML 변환 포함)까지 읽기 + H2에 id 주입 + 목차(toc) 추출
export function getPost(slug) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf-8');
  const { data, content } = matter(raw);
  let html = marked.parse(content);
  const toc = [];
  const seen = {};
  // H2에 id를 달아 목차 앵커 링크가 동작하도록(검색엔진 구조 인식 + 독자 네비)
  html = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (m, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    let id = slugifyHeading(text) || 'section';
    if (seen[id]) { seen[id] += 1; id = `${id}-${seen[id]}`; } else { seen[id] = 1; }
    toc.push({ id, text });
    return `<h2 id="${id}"${attrs}>${inner}</h2>`;
  });
  return {
    ...getPostMeta(slug),
    html,
    toc,
  };
}

// 최신순 정렬된 전체 목록(메타)
export function getAllPosts() {
  return getAllSlugs()
    .map(getPostMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 같은 카테고리 내 관련글 n개(내부링크). 현재 글 다음부터 순환 선택 → 링크가 고루 분산됨.
export function getRelatedPosts(slug, n = 6) {
  const cur = getPostMeta(slug);
  const same = getAllPosts().filter((p) => p.category === cur.category);
  if (same.length <= 1) return [];
  const idx = same.findIndex((p) => p.slug === slug);
  const out = [];
  for (let i = 1; out.length < n && i < same.length; i += 1) {
    out.push(same[(idx + i) % same.length]);
  }
  return out;
}
