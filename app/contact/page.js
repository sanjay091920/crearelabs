import { BRAND } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact — Book a Discovery Call or Send a Message',
  description: 'Book a 20-minute discovery call with Crearelabs. No pitch — we listen, ask a few questions, and tell you whether we can help and how.',
  alternates: { canonical: 'https://crearelabs.in/contact' },
};

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="label">Get in touch</div>
          <h1 className="h1" style={{ marginBottom: 16 }}>Let's talk about your business</h1>
          <p className="body-lg" style={{ maxWidth: 480, margin: '0 auto' }}>
            20-minute discovery call. No pitch — we listen, ask a few questions, and tell you whether we can help.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info column */}
            <div>
              <div className="label" style={{ marginBottom: 20 }}>How to reach us</div>

              {[
                { icon: '📞', label: 'Phone', val: BRAND.phone, href: `tel:${BRAND.phone}` },
                { icon: '💬', label: 'WhatsApp', val: 'Chat with us — fastest response', href: `https://wa.me/${BRAND.whatsapp}`, external: true },
                { icon: '📧', label: 'Email', val: BRAND.email, href: `mailto:${BRAND.email}` },
                { icon: '📍', label: 'Location', val: BRAND.address, href: null },
              ].map((info, i) => (
                <div key={i} className="info-card">
                  <span className="info-icon" aria-hidden="true">{info.icon}</span>
                  <div>
                    <div className="info-label">{info.label}</div>
                    {info.href ? (
                      <a href={info.href} target={info.external ? '_blank' : undefined} rel={info.external ? 'noreferrer' : undefined} className="info-val" style={{ color: 'var(--or)' }}>
                        {info.val}
                      </a>
                    ) : (
                      <div className="info-val">{info.val}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA box */}
              <div style={{ marginTop: 20, padding: 24, background: 'rgba(255,107,53,.06)', border: '1px solid rgba(255,107,53,.2)', borderRadius: 'var(--r16)' }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>⚡ Fastest response</div>
                <p className="body" style={{ marginBottom: 16 }}>
                  WhatsApp gets you a reply within 2 hours during business hours (Mon–Fri, 10am–7pm IST).
                </p>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=Hi+Crearelabs!+I'd+like+to+discuss+my+business.`}
                  target="_blank" rel="noreferrer"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <WAIcon /> WhatsApp Now
                </a>
              </div>
            </div>

            {/* Form column — client component */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

const WAIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
