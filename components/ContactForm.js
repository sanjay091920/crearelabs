'use client';
import { useState } from 'react';
import Link from 'next/link';
import { BRAND } from '@/lib/data';

const INDUSTRIES = [
  '', 'Restaurants & F&B', 'Product Brands / D2C',
  'E-Commerce & Retail', 'Healthcare', 'Other',
];

function validate(f) {
  const e = {};
  if (!f.name.trim() || f.name.trim().length < 2) e.name = 'Please enter your name';
  if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Please enter a valid email address';
  if (!f.message.trim() || f.message.trim().length < 10) e.message = 'Please write at least 10 characters';
  return e;
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', industry: '', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('');

  function set(field) {
    return (e) => {
      setForm(f => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors(er => { const n = { ...er }; delete n[field]; return n; });
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrMsg(err.message || 'Something went wrong. Please try WhatsApp instead.');
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form form-success">
        <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
        <h3 className="h3" style={{ marginBottom: 10 }}>Message received!</h3>
        <p className="body-lg" style={{ marginBottom: 22 }}>
          We'll get back to you within 1 business day. Check your inbox — a confirmation email is on its way.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer" className="btn-primary">💬 WhatsApp Us</a>
          <Link href="/" className="btn-ghost">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <h2 className="h3" style={{ marginBottom: 22 }}>Send us a message</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — hidden from humans, traps bots */}
        <input
          name="website" type="text" value={form.website}
          onChange={set('website')} tabIndex={-1}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
          autoComplete="off" aria-hidden="true"
        />

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full name *</label>
            <input
              id="name" className="form-input" required
              placeholder="Your full name"
              value={form.name} onChange={set('name')}
              aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined}
            />
            {errors.name && <span id="name-err" className="form-error" role="alert">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email address *</label>
            <input
              id="email" type="email" className="form-input" required
              placeholder="you@email.com"
              value={form.email} onChange={set('email')}
              aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined}
            />
            {errors.email && <span id="email-err" className="form-error" role="alert">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone number</label>
            <input id="phone" type="tel" className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
          </div>
          <div className="form-group">
            <label htmlFor="business" className="form-label">Business name</label>
            <input id="business" className="form-input" placeholder="Your business" value={form.business} onChange={set('business')} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="industry" className="form-label">Industry</label>
          <select id="industry" className="form-input" value={form.industry} onChange={set('industry')}>
            <option value="">Select your industry</option>
            {INDUSTRIES.filter(Boolean).map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">Message *</label>
          <textarea
            id="message" className="form-input" required rows={5}
            placeholder="Tell us about your business and what you'd like to achieve…"
            value={form.message} onChange={set('message')}
            style={{ resize: 'vertical' }}
            aria-invalid={!!errors.message} aria-describedby={errors.message ? 'msg-err' : undefined}
          />
          {errors.message && <span id="msg-err" className="form-error" role="alert">{errors.message}</span>}
        </div>

        {status === 'error' && (
          <div className="form-alert" role="alert">{errMsg}</div>
        )}

        <button
          type="submit" className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          disabled={status === 'sending'}
          aria-busy={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Send Message →'}
        </button>
        <p style={{ fontSize: 12, color: 'var(--mu)', textAlign: 'center', marginTop: 10 }}>
          We respond within 1 business day. Your information is never shared.
        </p>
      </form>
    </div>
  );
}
