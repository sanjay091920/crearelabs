import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JOBS } from '@/lib/data';
import ApplyForm from '@/components/ApplyForm';

export async function generateStaticParams() {
  return JOBS.map(j => ({ slug: j.slug }));
}

export async function generateMetadata({ params }) {
  const job = JOBS.find(j => j.slug === params.slug);
  if (!job) return { title: 'Job not found' };
  return {
    title: `${job.title} — ${job.department} at Crearelabs`,
    description: `${job.title} position at Crearelabs, ${job.location}. ${job.experience}, ${job.salary}.`,
    alternates: { canonical: `https://crearelabs.in/careers/${job.slug}` },
  };
}

export default function JobDetailPage({ params }) {
  const job = JOBS.find(j => j.slug === params.slug);
  if (!job) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.desc,
    hiringOrganization: { '@type': 'Organization', name: 'Crearelabs', sameAs: 'https://crearelabs.in' },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' } },
    employmentType: 'FULL_TIME',
    datePosted: '2024-03-01',
    url: `https://crearelabs.in/careers/${job.slug}`,
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
            <Link href="/careers" style={{ color: 'var(--mu)' }}>Careers</Link>
            <span aria-hidden="true">›</span>
            <span style={{ color: 'var(--tx)' }} aria-current="page">{job.title}</span>
          </nav>
        </div>
      </div>

      <div className="page-hero">
        <div className="container">
          <div className="job-dept" style={{ justifyContent: 'center', display: 'flex' }}>{job.department}</div>
          <h1 className="h1" style={{ marginBottom: 18 }}>{job.title}</h1>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[`📍 ${job.location}`, `⏱ ${job.type}`, `💼 ${job.experience}`, `💰 ${job.salary}`].map(tag => (
              <span key={tag} style={{ fontSize: 13, color: 'var(--mu)', background: 'var(--dk3)', border: '1px solid var(--bd)', borderRadius: 20, padding: '5px 14px' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr min(400px,100%)', gap: 48, alignItems: 'start' }}>
            {/* Role detail */}
            <div>
              <h2 className="h2" style={{ marginBottom: 16 }}>About the role</h2>
              <p className="body-lg" style={{ marginBottom: 36 }}>{job.desc}</p>

              <h3 className="h3" style={{ marginBottom: 16 }}>Responsibilities</h3>
              <div className="check-list" style={{ marginBottom: 36 }}>
                {job.responsibilities.map((r, i) => (
                  <div key={i} className="check-item">
                    <span className="check-dot" aria-hidden="true">✓</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              <h3 className="h3" style={{ marginBottom: 16 }}>Requirements</h3>
              <div className="check-list" style={{ marginBottom: 36 }}>
                {job.requirements.map((r, i) => (
                  <div key={i} className="check-item">
                    <span className="check-dot" style={{ color: 'var(--te)' }} aria-hidden="true">✓</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              <Link href="/careers" style={{ color: 'var(--mu)', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                ← Back to all roles
              </Link>
            </div>

            {/* Apply form — client component */}
            <ApplyForm jobId={job.slug} jobTitle={job.title} />
          </div>
        </div>
      </section>
    </>
  );
}
