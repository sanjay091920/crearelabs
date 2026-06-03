import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found — Crearelabs',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '40px 20px', textAlign: 'center',
    }}>
      <div style={{ maxWidth: 520 }}>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(72px, 18vw, 130px)',
          color: 'rgba(255,107,53,.15)',
          lineHeight: 1,
          marginBottom: 24,
          userSelect: 'none',
        }} aria-hidden="true">404</div>

        <div className="label" style={{ marginBottom: 12 }}>Page not found</div>
        <h1 className="h2" style={{ marginBottom: 16 }}>
          This page doesn't exist or has moved.
        </h1>
        <p className="body-lg" style={{ marginBottom: 36, maxWidth: 420, margin: '0 auto 36px' }}>
          Let's get you back to something useful. Try the homepage or contact us directly.
        </p>

        <div className="cta-btns" style={{ justifyContent: 'center' }}>
          <Link href="/" className="btn-primary">← Back to Home</Link>
          <Link href="/contact" className="btn-ghost">Contact Us</Link>
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { href: '/services',   label: 'Services' },
            { href: '/industries', label: 'Industries' },
            { href: '/blog',       label: 'Blog' },
            { href: '/careers',    label: 'Careers' },
          ].map(link => (
            <Link
              key={link.href} href={link.href}
              style={{ fontSize: 13, color: 'var(--mu)', padding: '6px 16px', border: '1px solid var(--bd)', borderRadius: 20 }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
