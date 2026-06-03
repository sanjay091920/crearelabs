import Link from 'next/link';
import { BRAND, PROCESS } from '@/lib/data';

export const metadata = {
  title: 'Our Process — From Discovery to Compounding Growth',
  description: 'How Crearelabs works: 4-phase engagement from discovery to compounding growth. Transparent, founder-led, and built for long-term results.',
  alternates: { canonical: 'https://crearelabs.in/process' },
};

const HOW_DIFFERENT = [
  { title: 'No templates', desc: 'Every engagement starts with a blank sheet. We calibrate the strategy to your specific industry, locality, and competitive position.' },
  { title: 'Weekly reviews', desc: 'Not monthly PDFs. Every week you get a review with business-value metrics — covers, orders, repeat-rate — not just impressions.' },
  { title: 'Founder-led QBRs', desc: 'Every quarter, the founder sits down with you to review progress, adjust strategy, and plan the next 90 days.' },
  { title: 'Compliance first', desc: 'For healthcare, F&B, and regulated industries, every campaign goes through a compliance review before it ships.' },
];

export default function ProcessPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="label">How we work</div>
          <h1 className="h1" style={{ marginBottom: 16 }}>From discovery to compounding growth</h1>
          <p className="body-lg" style={{ maxWidth: 520, margin: '0 auto' }}>
            A clear four-phase process. No surprises, no handoff to an account manager you've never met — the same team that pitches you executes for you.
          </p>
        </div>
      </div>

      {/* Process steps */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            {PROCESS.map((p, i) => (
              <article key={p.step} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 28, marginBottom: 48, paddingBottom: 48, borderBottom: i < PROCESS.length - 1 ? '1px solid var(--bd)' : 'none' }}>
                <div>
                  <div style={{ fontFamily: 'var(--sr)', fontSize: 42, color: 'rgba(255,107,53,.25)', lineHeight: 1, marginBottom: 8 }} aria-hidden="true">{p.step}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: 'var(--or)', textTransform: 'uppercase' }}>{p.phase}</div>
                </div>
                <div>
                  <h2 className="h2" style={{ marginBottom: 14 }}>{p.title}</h2>
                  <p className="body-lg">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What's different */}
      <section className="sect-alt section">
        <div className="container">
          <div className="label">What makes this different</div>
          <h2 className="h2" style={{ marginBottom: 40 }}>Not a typical agency engagement</h2>
          <div className="card-grid">
            {HOW_DIFFERENT.map((h, i) => (
              <div key={i} className="card">
                <h3 className="card-title">{h.title}</h3>
                <p className="body">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-block">
            <h2 className="h2" style={{ marginBottom: 16 }}>Ready to start with Discovery?</h2>
            <p className="body-lg" style={{ maxWidth: 460, margin: '0 auto 32px' }}>
              Step 1 is a 60-minute session. We learn your business, your locality, and your goals. No pitch.
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
