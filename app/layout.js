import './globals.css';
import Script from 'next/script';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://crearelabs.in';
const GA4  = process.env.NEXT_PUBLIC_GA4_ID;

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default:  'Crearelabs — Tech + Marketing for Restaurants & Brands | Noida',
    template: '%s | Crearelabs',
  },
  description: 'Industry-aware tech and digital marketing for restaurants, product brands, e-commerce, and retail. SEO, performance ads, web engineering — based in Noida, NCR.',
  keywords:    ['digital marketing agency Noida', 'restaurant marketing India', 'D2C brand marketing', 'local SEO Noida', 'performance marketing NCR'],
  authors:     [{ name: 'Crearelabs', url: SITE }],
  creator:     'Crearelabs',
  openGraph: {
    type:      'website',
    locale:    'en_IN',
    siteName:  'Crearelabs',
    title:     'Crearelabs — Tech + Marketing for Restaurants & Brands',
    description:'Industry-aware tech and digital marketing. Restaurants, D2C brands, e-commerce. Based in Noida.',
    images:    [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Crearelabs — Tech + Marketing Agency Noida' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Crearelabs — Tech + Marketing for Restaurants & Brands',
    description: 'Industry-aware tech and digital marketing. Noida-based agency.',
    images:      ['/og-default.png'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-video-preview': -1, 'max-snippet': -1 },
  },
  verification: { google: 'REPLACE_WITH_SEARCH_CONSOLE_TOKEN' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#09090F" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {/* Google Analytics */}
        {GA4 && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${GA4}');
            `}</Script>
          </>
        )}

        {/* Skip link for keyboard/screen reader users */}
        <a href="#main-content" className="skip-link">Skip to main content</a>

        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
