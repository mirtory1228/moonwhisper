import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getPost, getPostMeta } from '@/lib/posts';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';

// 빌드 시 모든 글을 정적 페이지로 생성 (SEO 최적)
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// 글마다 개별 메타태그(제목/설명/키워드) → 검색 노출용
export function generateMetadata({ params }) {
  let meta;
  try {
    meta = getPostMeta(params.slug);
  } catch {
    return {};
  }
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'article',
      images: meta.image ? [meta.image] : [],
    },
  };
}

export default function PostPage({ params }) {
  let post;
  try {
    post = getPost(params.slug);
  } catch {
    notFound();
  }

  return (
    <article>
      <JsonLd post={post} />

      <header className="article-header">
        <span className="post-cat">{post.category}</span>
        <h1>{post.title}</h1>
        {post.date && <p className="meta">{post.date}</p>}
      </header>

      {/* 답변형 In short(AI 인용·리치결과 신호). tldr 없으면 description 폴백 */}
      {post.tldr && (
        <div className="post-tldr">
          <span className="post-tldr-label">In short</span>
          <p>{post.tldr}</p>
        </div>
      )}

      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={`article-cover${post.image.includes('/misc/') ? ' article-cover-wide' : ''}`}
          src={post.image}
          alt={post.title}
        />
      )}

      <AdSlot label="본문 상단 광고" />

      <div className="article-body" dangerouslySetInnerHTML={{ __html: post.html }} />

      {post.faq.length > 0 && (
        <section className="post-faq">
          <h2>Frequently Asked Questions</h2>
          <dl>
            {post.faq.map((item, i) => (
              <div className="post-faq-item" key={i}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <AdSlot label="본문 하단 광고" />

      <footer className="article-footer">
        <p>This content is for entertainment and reflection. Take what resonates and make your own decisions.</p>
        <Link href="/" className="back-link">← Back to all</Link>
      </footer>
    </article>
  );
}
