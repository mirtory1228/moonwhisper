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

// 본문(HTML 변환 포함)까지 읽기
export function getPost(slug) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf-8');
  const { data, content } = matter(raw);
  return {
    ...getPostMeta(slug),
    html: marked.parse(content),
  };
}

// 최신순 정렬된 전체 목록(메타)
export function getAllPosts() {
  return getAllSlugs()
    .map(getPostMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
