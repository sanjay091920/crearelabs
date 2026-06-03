'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('cl_cookies_accepted')) {
        setVisible(true);
      }
    } catch {
      // localStorage not available (SSR/private mode)
    }
  }, []);

  function accept() {
    try { localStorage.setItem('cl_cookies_accepted', '1'); } catch {}
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem('cl_cookies_accepted', '0'); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <p className="cookie-text">
        We use cookies to improve your experience and understand site traffic.{' '}
        <Link href="/cookie-policy">Learn more</Link>
      </p>
      <div className="cookie-btns">
        <button onClick={decline} className="btn-ghost btn-sm" type="button">Decline</button>
        <button onClick={accept}  className="btn-primary btn-sm" type="button">Accept</button>
      </div>
    </div>
  );
}
