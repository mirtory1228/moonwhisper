import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getPost, getPostMeta, getRelatedPosts } from '@/lib/posts';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/lib/site';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function formatMonthYear(d) {
  const m = /^(\d{4})-(\d{2})/.exec(String(d));
  return m ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}` : d;
}

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
    alternates: { canonical: `/posts/${params.slug}` },
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

  const related = getRelatedPosts(params.slug, 6);

  return (
    <article>
      <JsonLd post={post} />

      <header className="article-header">
        <span className="post-cat">{post.category}</span>
        <h1>{post.title}</h1>
        <p className="article-byline">
          Reviewed &amp; edited by <Link href="/editorial-policy">Mira, Editor at {SITE.name}</Link>
          {post.date && <> · Last updated {formatMonthYear(post.date)}</>}
        </p>
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

      {/* 목차: 검색엔진 구조 인식 + 독자 네비게이션(체류시간↑) */}
      {post.toc && post.toc.length >= 3 && (
        <nav className="post-toc" aria-label="Contents">
          <p className="post-toc-label">Contents</p>
          <ul>
            {post.toc.map((t) => (
              <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>
            ))}
          </ul>
        </nav>
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

      {/* 관련글 내부링크: 체류시간·SEO·전면광고 기회 ↑ (앵커=글 제목) */}
      {related.length > 0 && (
        <section className="post-related">
          <h2>Related meanings</h2>
          <ul>
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`/posts/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <AdSlot label="본문 하단 광고" />

      <aside className="author-box">
        <svg
          className="author-avatar"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
        <div>
          <p className="author-name">Mira · Editor at {SITE.name}</p>
          <p className="author-bio">
            Guides here start from traditional interpretations, are drafted with AI assistance, and
            are reviewed and edited for clarity and responsible wording.{' '}
            <Link href="/editorial-policy">How we write these →</Link>
          </p>
        </div>
      </aside>

      <footer className="article-footer">
        <p>This content is for entertainment and reflection. Take what resonates and make your own decisions.</p>
        <Link href="/" className="back-link">← Back to all</Link>
      </footer>
    </article>
  );
}
