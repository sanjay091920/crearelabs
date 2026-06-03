import Link from 'next/link';
import { BRAND, STATS, SERVICES, INDUSTRIES, COMPARISON, PROCESS, TESTIMONIALS, FAQS, BLOG_POSTS } from '@/lib/data';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata = {
  title: 'Crearelabs — Tech + Marketing for Restaurants & Brands | Noida',
  description: 'Industry-aware tech and digital marketing for restaurants, product brands, e-commerce, and retail. Web engineering, SEO, performance ads — Noida, NCR.',
  alternates: { canonical: 'https://crearelabs.in' },
};

const LD_JSON = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://crearelabs.in/#org',
      name: 'Crearelabs',
      url: 'https://crearelabs.in',
      telephone: BRAND.phone,
      email: BRAND.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
      foundingDate: BRAND.founded,
      sameAs: [BRAND.instagram, BRAND.linkedin].filter(Boolean),
    },
    {
      '@type': 'LocalBusiness',
      name: 'Crearelabs',
      url: 'https://crearelabs.in',
      telephone: BRAND.phone,
      priceRange: '₹₹',
      address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.slice(0, 3).map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function HomePage() {
  const featuredPosts = BLOG_POSTS.filter(p => p.featured).slice(0, 2);
  const previewFaqs   = FAQS.slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD_JSON) }} />

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="fade-in">
              <div className="hero-badge" aria-hidden="true">TECH + CREATIVE · NOIDA</div>
              <h1 className="h1" style={{ marginBottom: 20 }}>
                Tech and marketing built for restaurants, brands &amp; product companies.
              </h1>
              <p className="body-lg" style={{ marginBottom: 32, maxWidth: 520 }}>
                Web engineering, digital presence, performance marketing, and brand reputation — calibrated to your industry. Featured depth in restaurants, product brands, e-commerce, and retail.
              </p>
              <div className="hero-cta">
                <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer" className="btn-primary">
                  <WAIcon /> Book a Discovery Call
                </a>
                <Link href="/industries" className="btn-ghost">See Industries We Serve</Link>
              </div>
              <p className="hero-note">Working with restaurants, product brands &amp; retailers across NCR.</p>
            </div>
            <div className="hero-orb fade-in-2" aria-hidden="true">
              <div className="hero-gfx" />
              <div className="hero-inner">
                {['🍽️', '📦', '🛒', '⚡'].map((ic, i) => (
                  <div key={i} style={{ fontSize: 26, animation: `float ${2 + i * 0.4}s ease-in-out infinite` }}>{ic}</div>
                ))}
                <div style={{ fontFamily: 'var(--sr)', fontSize: 10, color: 'var(--or)', letterSpacing: '.12em', marginTop: 4 }}>
                  CREARELABS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stats-grid" role="list" aria-label="Company statistics">
            {STATS.map((s, i) => (
              <div key={i} className="stat-box" role="listitem">
                <div className="stat-val">{s.value}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ────────────────────────────────── */}
      <section className="sect-alt section">
        <div className="container">
          <div className="label">Why industry-calibrated beats generic</div>
          <h2 className="h2" style={{ marginBottom: 36 }}>Industry-aware tech + marketing vs. generic agencies</h2>
          <div className="compare-wrap" tabIndex={0} aria-label="Comparison table, scroll horizontally">
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '22%' }}>What matters</th>
                  <th scope="col" style={{ width: '39%' }}>Generic agency</th>
                  <th scope="col" className="th-creare" style={{ width: '39%' }}>Crearelabs ✓</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td style={{ color: 'var(--mu)' }}>{row.generic}</td>
                    <td className="td-creare">{row.creare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ─────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="label">What we do</div>
          <h2 className="h2" style={{ marginBottom: 40 }}>Four capabilities. One integrated team.</h2>
          <div className="card-grid">
            {SERVICES.map(s => (
              <article key={s.id} className="card">
                <div className="card-icon" aria-hidden="true">{s.icon}</div>
                <h3 className="card-title">{s.title}</h3>
                <p className="body">{s.desc}</p>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/services" className="btn-ghost">View all services →</Link>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES OVERVIEW ───────────────────────── */}
      <section className="sect-alt section">
        <div className="container">
          <div className="label">Industries we serve</div>
          <h2 className="h2" style={{ marginBottom: 40 }}>Deep expertise, not broad generalism</h2>
          <div className="ind-grid">
            {INDUSTRIES.map(ind => (
              <Link key={ind.id} href="/industries" className="ind-card">
                <div className="ind-stripe" style={{ background: ind.color }} aria-hidden="true" />
                <div className="card-icon" aria-hidden="true">{ind.icon}</div>
                <h3 className="card-title" style={{ color: ind.color }}>{ind.name}</h3>
                <p className="body">{ind.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS OVERVIEW ──────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="label">How we work</div>
          <h2 className="h2" style={{ marginBottom: 40 }}>From discovery to compounding growth</h2>
          <div className="proc-grid">
            {PROCESS.map(p => (
              <div key={p.step} className="proc-item">
                <div className="proc-num" aria-hidden="true">{p.step}</div>
                <div className="proc-phase">{p.phase}</div>
                <h3 className="h3" style={{ marginBottom: 10 }}>{p.title}</h3>
                <p className="body">{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/process" className="btn-ghost">View full process →</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────── */}
      <section className="sect-alt section">
        <div className="container">
          <div className="label">What clients say</div>
          <h2 className="h2" style={{ marginBottom: 40 }}>Results from real businesses</h2>
          <div className="test-grid">
            {TESTIMONIALS.map((t, i) => (
              <article key={i} className="test-card">
                <div className="test-icon" aria-hidden="true">{t.icon}</div>
                <blockquote>
                  <p className="test-quote">"{t.quote}"</p>
                </blockquote>
                <footer className="test-author">
                  <div className="test-avatar" aria-hidden="true">{t.name[0]}</div>
                  <div>
                    <div className="test-name">{t.name}</div>
                    <div className="test-role">{t.role}</div>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ──────────────────────────────── */}
      {featuredPosts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="label">Latest insights</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
              <h2 className="h2">Marketing playbooks</h2>
              <Link href="/blog" className="btn-ghost btn-sm">View all →</Link>
            </div>
            <div className="blog-grid">
              {featuredPosts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-thumb" aria-hidden="true">{post.icon}</div>
                  <div className="blog-body">
                    <span className="blog-cat">{post.category}</span>
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="body">{post.excerpt}</p>
                    <div className="blog-meta">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ PREVIEW ───────────────────────────────── */}
      <section className="sect-alt section">
        <div className="container" style={{ maxWidth: 780 }}>
          <div className="label">Common questions</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <h2 className="h2">Questions before you engage</h2>
            <Link href="/faq" className="btn-ghost btn-sm">All FAQs →</Link>
          </div>
          <FAQAccordion faqs={previewFaqs} />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="cta-block">
            <h2 className="h2" style={{ marginBottom: 16 }}>Ready to grow your restaurant or brand?</h2>
            <p className="body-lg" style={{ maxWidth: 500, margin: '0 auto 32px' }}>
              20-minute discovery call. No pitch. We listen, ask a few questions, and tell you whether we can help — and how.
            </p>
            <div className="cta-btns">
              <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer" className="btn-primary">
                <WAIcon /> Book Discovery Call
              </a>
              <Link href="/contact" className="btn-ghost">Send a message</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const WAIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
