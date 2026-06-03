import Link from 'next/link';
import { BRAND, FAQS } from '@/lib/data';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata = {
  title: 'FAQ — Pre-Sales Questions Answered',
  description: 'Honest answers to questions about results timelines, minimum investment, guarantees, and how Crearelabs works — before you get on a call.',
  alternates: { canonical: 'https://crearelabs.in/faq' },
};

const LD_JSON = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD_JSON) }} />

      <div className="page-hero">
        <div className="container">
          <div className="label">Pre-sales FAQ</div>
          <h1 className="h1" style={{ marginBottom: 16 }}>Questions you're thinking but won't ask on the call</h1>
          <p className="body-lg" style={{ maxWidth: 480, margin: '0 auto' }}>
            Honest answers to the questions that matter before you engage with any agency.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      <section className="sect-alt section">
        <div className="container" style={{ textAlign: 'center', maxWidth: 560 }}>
          <h2 className="h2" style={{ marginBottom: 12 }}>Still have questions?</h2>
          <p className="body-lg" style={{ marginBottom: 28 }}>The fastest way to get answers is a 20-minute call. No pitch, just answers.</p>
          <div className="cta-btns">
            <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer" className="btn-primary">
              <WAIcon /> WhatsApp Us
            </a>
            <Link href="/contact" className="btn-ghost">Send a message</Link>
          </div>
        </div>
      </section>
    </>
  );
}

const WAIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
