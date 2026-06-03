import Link from 'next/link';
import { BRAND, BLOG_POSTS } from '@/lib/data';

export const metadata = {
  title: 'Blog — Marketing Playbooks for Restaurants & Brands',
  description: 'Practical guides on restaurant SEO, D2C product launches, Google Maps ranking, and performance marketing in India.',
  alternates: { canonical: 'https://crearelabs.in/blog' },
};

// searchParams is a server-side prop — no 'use client' needed
export default function BlogPage({ searchParams }) {
  const activeCat = searchParams?.cat || 'All';
  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];
  const filtered   = activeCat === 'All' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === activeCat);
  const featured   = BLOG_POSTS.find(p => p.featured);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="label">Insights & Playbooks</div>
          <h1 className="h1" style={{ marginBottom: 16 }}>Marketing intelligence<br />for restaurants and brands</h1>
          <p className="body-lg" style={{ maxWidth: 520, margin: '0 auto' }}>
            Practical guides written from real client engagements — not generic marketing advice.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Featured post */}
          {featured && activeCat === 'All' && (
            <Link href={`/blog/${featured.slug}`} className="blog-card" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center', padding: 'clamp(20px,3vw,40px)', marginBottom: 40, borderRadius: 20, background: 'linear-gradient(135deg,rgba(255,107,53,.08),rgba(46,196,182,.05))', border: '1px solid rgba(255,107,53,.2)' }}>
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
                  <span className="blog-cat">{featured.category}</span>
                  <span className="badge-or">FEATURED</span>
                </div>
                <h2 className="h2" style={{ marginBottom: 12 }}>{featured.title}</h2>
                <p className="body-lg" style={{ marginBottom: 14 }}>{featured.excerpt}</p>
                <div className="blog-meta" style={{ justifyContent: 'flex-start', gap: 16 }}>
                  <span>{featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
              <div style={{ fontSize: 72, lineHeight: 1, flexShrink: 0 }} aria-hidden="true">{featured.icon}</div>
            </Link>
          )}

          {/* Category filters — URL-based (server-rendered) */}
          <div className="blog-filters" role="list" aria-label="Filter by category">
            {categories.map(cat => (
              <Link
                key={cat}
                href={cat === 'All' ? '/blog' : `/blog?cat=${encodeURIComponent(cat)}`}
                role="listitem"
                className={`filter-btn${cat === activeCat ? ' active' : ''}`}
                aria-current={cat === activeCat ? 'true' : undefined}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Posts grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--mu)' }}>
              No posts in this category yet. Check back soon.
            </div>
          ) : (
            <div className="blog-grid">
              {filtered.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-thumb" aria-hidden="true">{post.icon}</div>
                  <div className="blog-body">
                    <span className="blog-cat">{post.category}</span>
                    <h2 className="blog-title">{post.title}</h2>
                    <p className="body">{post.excerpt}</p>
                    <div className="blog-meta">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="sect-alt section">
        <div className="container" style={{ textAlign: 'center', maxWidth: 560 }}>
          <h2 className="h2" style={{ marginBottom: 12 }}>Want this strategy for your business?</h2>
          <p className="body-lg" style={{ marginBottom: 28 }}>Book a free 20-minute call. We'll audit your setup and tell you exactly what to fix first.</p>
          <div className="cta-btns">
            <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer" className="btn-primary">
              <WAIcon /> Book Discovery Call
            </a>
            <Link href="/contact" className="btn-ghost">Send a message</Link>
          </div>
        </div>
      </section>
    </>
  );
}

const WAIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
