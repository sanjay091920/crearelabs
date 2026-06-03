'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '60vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '40px 20px', textAlign: 'center',
    }}>
      <div style={{ maxWidth: 480 }}>
        <div style={{ fontSize: 52, marginBottom: 20 }} aria-hidden="true">⚠️</div>
        <div className="label" style={{ marginBottom: 12 }}>Something went wrong</div>
        <h1 className="h2" style={{ marginBottom: 16 }}>
          An unexpected error occurred.
        </h1>
        <p className="body-lg" style={{ marginBottom: 32 }}>
          We've been notified and are looking into it. Try refreshing the page or contact us if the problem persists.
        </p>
        <div className="cta-btns" style={{ justifyContent: 'center' }}>
          <button onClick={() => reset()} className="btn-primary">Try again</button>
          <Link href="/" className="btn-ghost">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
