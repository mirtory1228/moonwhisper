import { SITE } from '@/lib/site';

// 글 페이지용 구조화 데이터(JSON-LD).
// - Article: 검색 리치결과 + AI 답변엔진 인용 신호
// - BreadcrumbList: 경로(홈 > 글)
// - FAQPage: 프론트매터 faq가 있을 때만 (AI 개요/답변이 Q&A를 그대로 인용)
export default function JsonLd({ post }) {
  const base = SITE.url.replace(/\/$/, '');
  const url = `${base}/posts/${post.slug}`;
  const img = post.image
    ? (post.image.startsWith('http') ? post.image : `${base}${post.image}`)
    : undefined;

  const graph = [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.description || post.tldr || '',
      inLanguage: 'en-US',
      articleSection: post.category,
      keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : undefined,
      datePublished: post.date || undefined,
      dateModified: post.updated || post.date || undefined,
      image: img ? [img] : undefined,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      author: { '@type': 'Person', name: SITE.editor || 'Mira', url: `${base}/editorial-policy` },
      publisher: { '@type': 'Organization', name: SITE.name, url: base },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: base },
        { '@type': 'ListItem', position: 2, name: post.title, item: url },
      ],
    },
  ];

  if (post.faq && post.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: post.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  const data = { '@context': 'https://schema.org', '@graph': graph };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
