import Link from 'next/link';
import { BRAND } from '@/lib/data';

const COMPANY_LINKS = [
  ['/', 'Home'], ['/services', 'Services'], ['/industries', 'Industries'],
  ['/process', 'Process'], ['/blog', 'Blog'], ['/careers', 'Careers'],
  ['/faq', 'FAQ'], ['/contact', 'Contact'],
];

const LEGAL_LINKS = [
  ['/privacy-policy', 'Privacy Policy'],
  ['/terms-of-service', 'Terms of Service'],
  ['/cookie-policy', 'Cookie Policy'],
];

const SERVICE_LINKS = [
  ['/services', 'SEO & Local Search'],
  ['/services', 'Performance Marketing'],
  ['/services', 'Brand & Reputation'],
  ['/services', 'Web Engineering'],
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
          <div>
            <Link href="/" className="nav-logo" style={{ marginBottom: 14, display: 'inline-flex' }} aria-label="Crearelabs home">
              <div className="nav-badge" aria-hidden="true">C</div>
              <span className="nav-name">{BRAND.name}</span>
            </Link>
            <p className="body" style={{ maxWidth: 290, marginBottom: 18 }}>
              Noida-based tech + marketing partner for restaurants, product brands, e-commerce, and any growth-focused business.
            </p>
            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--mu)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <MapPin /> {BRAND.address}
              </span>
              <a href={`tel:${BRAND.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--or)' }}>
                <PhoneIcon /> {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--or)' }}>
                <MailIcon /> {BRAND.email}
              </a>
            </address>

            {/* Social */}
            <div className="footer-social" aria-label="Social media links">
              {BRAND.instagram && (
                <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
                  <span aria-hidden="true">📷</span>
                </a>
              )}
              {BRAND.linkedin && (
                <a href={BRAND.linkedin} target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
                  <span aria-hidden="true">💼</span>
                </a>
              )}
              <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer" className="social-btn" aria-label="WhatsApp">
                <span aria-hidden="true">💬</span>
              </a>
            </div>
          </div>

          {/* Company links */}
          <nav aria-label="Company pages">
            <div className="footer-lbl">Company</div>
            {COMPANY_LINKS.map(([href, label]) => (
              <Link key={href + label} href={href} className="footer-link">{label}</Link>
            ))}
          </nav>

          {/* Services links */}
          <nav aria-label="Services">
            <div className="footer-lbl">Services</div>
            {SERVICE_LINKS.map(([href, label]) => (
              <Link key={label} href={href} className="footer-link">{label}</Link>
            ))}
          </nav>

          {/* Legal links */}
          <nav aria-label="Legal pages">
            <div className="footer-lbl">Legal</div>
            {LEGAL_LINKS.map(([href, label]) => (
              <Link key={href} href={href} className="footer-link">{label}</Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">© {year} {BRAND.name}. All rights reserved.</p>
          <div className="footer-legal">
            {LEGAL_LINKS.map(([href, label]) => (
              <Link key={href} href={href}>{label.split(' ')[0]}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const PhoneIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z"/></svg>;
const MailIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const MapPin    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
