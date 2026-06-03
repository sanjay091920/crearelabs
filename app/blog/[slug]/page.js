import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BRAND, BLOG_POSTS } from '@/lib/data';

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://crearelabs.in/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date },
  };
}

function parseContent(text) {
  return text.split('\n\n').map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    // Bold heading lines: **heading**
    if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
      return <h2 key={i} className="h3" style={{ marginTop: 36, marginBottom: 14 }}>{trimmed.slice(2, -2)}</h2>;
    }
    // Inline bold
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} style={{ fontSize: 16, color: 'var(--mu)', lineHeight: 1.85, marginBottom: 20 }}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} style={{ color: 'var(--tx)' }}>{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    );
  }).filter(Boolean);
}

export default function BlogPostPage({ params }) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 2);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: 'Crearelabs' },
    publisher: { '@type': 'Organization', name: 'Crearelabs', url: 'https://crearelabs.in' },
    datePublished: post.date,
    url: `https://crearelabs.in/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <div style={{ background: 'var(--dk2)', borderBottom: '1px solid var(--bd)', padding: '12px 0' }}>
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mu)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--mu)' }}>Home</Link>
            <span aria-hidden="true">›</span>
            <Link href="/blog" style={{ color: 'var(--mu)' }}>Blog</Link>
            <span aria-hidden="true">›</span>
            <span style={{ color: 'var(--tx)' }} aria-current="page">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
            <span className="blog-cat">{post.category}</span>
            <span style={{ color: 'var(--mu)', fontSize: 12 }}>{post.date} · {post.readTime}</span>
          </div>
          <h1 className="h1" style={{ marginBottom: 16 }}>{post.title}</h1>
          <p className="body-lg">{post.excerpt}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <article style={{ maxWidth: 740, margin: '0 auto' }}>
            {/* Author bar */}
            <div style={{ borderBottom: '1px solid var(--bd)', paddingBottom: 24, marginBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B35,#FF3D00)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sr)', color: '#fff', fontWeight: 700, flexShrink: 0 }} aria-hidden="true">C</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Crearelabs Team</div>
                  <div style={{ fontSize: 12, color: 'var(--mu)' }}>crearelabs.in</div>
                </div>
              </div>
              {/* Share buttons */}
              <div style={{ display: 'flex', gap: 8 }}>
                <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} https://crearelabs.in/blog/${post.slug}`)}`}
                  target="_blank" rel="noreferrer" className="btn-ghost btn-sm" aria-label="Share on WhatsApp">
                  💬 Share
                </a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://crearelabs.in/blog/${post.slug}`)}`}
                  target="_blank" rel="noreferrer" className="btn-ghost btn-sm" aria-label="Share on X/Twitter">
                  𝕏 Share
                </a>
              </div>
            </div>

            {/* Content */}
            <div>{parseContent(post.content)}</div>

            {/* In-content CTA */}
            <div style={{ marginTop: 52, padding: 'clamp(20px,4vw,36px)', background: 'linear-gradient(135deg,rgba(255,107,53,.1),rgba(46,196,182,.07))', border: '1px solid rgba(255,107,53,.2)', borderRadius: 16, textAlign: 'center' }}>
              <h3 className="h3" style={{ marginBottom: 10 }}>Want this strategy for your business?</h3>
              <p className="body" style={{ marginBottom: 22 }}>Book a free 20-minute call. We'll audit your current setup and tell you exactly what to fix first.</p>
              <div className="cta-btns">
                <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer" className="btn-primary">
                  <WAIcon /> Book Discovery Call
                </a>
                <Link href="/contact" className="btn-ghost">Send a message</Link>
              </div>
            </div>

            {/* Back link */}
            <div style={{ marginTop: 36 }}>
              <Link href="/blog" style={{ color: 'var(--mu)', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                ← Back to blog
              </Link>
            </div>
          </article>

          {/* Related posts */}
          {related.length > 0 && (
            <div style={{ maxWidth: 740, margin: '48px auto 0', paddingTop: 40, borderTop: '1px solid var(--bd)' }}>
              <h2 className="h3" style={{ marginBottom: 24 }}>More from the blog</h2>
              <div className="blog-grid">
                {related.map(rp => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="blog-card">
                    <div className="blog-thumb" aria-hidden="true">{rp.icon}</div>
                    <div className="blog-body">
                      <span className="blog-cat">{rp.category}</span>
                      <h3 className="blog-title">{rp.title}</h3>
                      <p className="body">{rp.excerpt}</p>
                      <div className="blog-meta">
                        <span>{rp.date}</span>
                        <span>{rp.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

const WAIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
