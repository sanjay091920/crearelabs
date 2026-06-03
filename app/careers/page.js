import Link from 'next/link';
import { JOBS } from '@/lib/data';

export const metadata = {
  title: 'Careers — Join Crearelabs in Noida',
  description: 'Join a focused tech + marketing team in Noida. Open roles in performance marketing, SEO, and frontend engineering.',
  alternates: { canonical: 'https://crearelabs.in/careers' },
};

const PERKS = [
  { icon: '🏠', title: 'Hybrid-first', desc: 'Work from office or remote — we care about output, not hours on seat.' },
  { icon: '📈', title: 'Real ownership', desc: "Own campaigns and products — not just execute tasks from a Jira board." },
  { icon: '🧠', title: 'Industry depth', desc: 'Develop genuine expertise in F&B, product brands, and e-commerce marketing.' },
  { icon: '💸', title: 'Performance bonuses', desc: 'Revenue-linked bonuses — when clients win, you win.' },
  { icon: '📚', title: 'Learning budget', desc: '₹15,000/year for courses, tools, and conferences.' },
  { icon: '🚀', title: 'Small team, big impact', desc: "Your work ships fast. No 6-month approval cycles. Direct impact on revenue." },
];

export default function CareersPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="label">Join Crearelabs</div>
          <h1 className="h1" style={{ marginBottom: 16 }}>Build the future of industry-aware marketing</h1>
          <p className="body-lg" style={{ maxWidth: 540, margin: '0 auto' }}>
            Small, focused team in Noida building tech and marketing products for restaurants, brands, and retailers. No office politics — just great work and real ownership.
          </p>
        </div>
      </div>

      {/* Perks */}
      <section className="section">
        <div className="container">
          <div className="label">Why Crearelabs</div>
          <h2 className="h2" style={{ marginBottom: 36 }}>What it's like to work here</h2>
          <div className="perks-grid">
            {PERKS.map((p, i) => (
              <div key={i} className="perk-card">
                <div className="perk-icon" aria-hidden="true">{p.icon}</div>
                <div className="perk-title">{p.title}</div>
                <p className="body">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="sect-alt section">
        <div className="container">
          <div className="label">Open positions</div>
          <h2 className="h2" style={{ marginBottom: 32 }}>{JOBS.length} role{JOBS.length !== 1 ? 's' : ''} open right now</h2>
          <div className="job-grid">
            {JOBS.map(job => (
              <Link key={job.slug} href={`/careers/${job.slug}`} className="job-card">
                <div className="job-head">
                  <div>
                    <div className="job-dept">{job.department}</div>
                    <h3 className="job-title">{job.title}</h3>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
                    <span className="status-pill status-live">● Hiring</span>
                    <span style={{ color: 'var(--or)', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>View →</span>
                  </div>
                </div>
                <p className="body">{job.desc}</p>
                <div className="job-tags">
                  <span className="job-tag">📍 {job.location}</span>
                  <span className="job-tag">⏱ {job.type}</span>
                  <span className="job-tag">💼 {job.experience}</span>
                  <span className="job-tag">💰 {job.salary}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Speculative */}
      <section className="section">
        <div className="container" style={{ maxWidth: 680, textAlign: 'center' }}>
          <h2 className="h2" style={{ marginBottom: 14 }}>Don't see your role?</h2>
          <p className="body-lg" style={{ marginBottom: 28 }}>
            We occasionally hire great people even when we're not actively recruiting. Send us your CV and a note about what you do best.
          </p>
          <a href="mailto:ahirwarsanjay0901@gmail.com?subject=Speculative Application" className="btn-primary">
            📧 Send a speculative application
          </a>
        </div>
      </section>
    </>
  );
}
