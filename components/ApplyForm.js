'use client';
import { useState } from 'react';
import Link from 'next/link';

function validate(f) {
  const e = {};
  if (!f.name.trim() || f.name.trim().length < 2) e.name = 'Please enter your full name';
  if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Please enter a valid email';
  if (!f.phone.trim() || f.phone.trim().length < 7) e.phone = 'Please enter your phone number';
  if (!f.cover.trim() || f.cover.trim().length < 20) e.cover = 'Please write at least 20 characters';
  return e;
}

export default function ApplyForm({ jobId, jobTitle }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', cover: '', portfolio: '', linkedin: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
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
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, jobId, jobTitle }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrMsg(err.message || 'Something went wrong. Please email ahirwarsanjay0901@gmail.com directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form form-success">
        <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
        <h3 className="h3" style={{ marginBottom: 10 }}>Application submitted!</h3>
        <p className="body" style={{ marginBottom: 20 }}>
          We review all applications within 3–5 business days and will reach out if there's a fit. A confirmation email has been sent to you.
        </p>
        <Link href="/careers" className="btn-ghost">← Back to all roles</Link>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <h2 className="h3" style={{ marginBottom: 20 }}>Apply for this role</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="ap-name" className="form-label">Full name *</label>
          <input
            id="ap-name" className="form-input" required
            placeholder="Your full name"
            value={form.name} onChange={set('name')}
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="form-error" role="alert">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ap-email" className="form-label">Email *</label>
            <input
              id="ap-email" type="email" className="form-input" required
              placeholder="you@email.com"
              value={form.email} onChange={set('email')}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span className="form-error" role="alert">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="ap-phone" className="form-label">Phone *</label>
            <input
              id="ap-phone" type="tel" className="form-input" required
              placeholder="+91 98765 43210"
              value={form.phone} onChange={set('phone')}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <span className="form-error" role="alert">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ap-cover" className="form-label">Cover note *</label>
          <textarea
            id="ap-cover" className="form-input" required rows={5}
            placeholder="Tell us why you're a great fit for this role…"
            value={form.cover} onChange={set('cover')}
            style={{ resize: 'vertical' }}
            aria-invalid={!!errors.cover}
          />
          {errors.cover && <span className="form-error" role="alert">{errors.cover}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ap-portfolio" className="form-label">Portfolio URL</label>
            <input id="ap-portfolio" type="url" className="form-input" placeholder="https://yourwork.com" value={form.portfolio} onChange={set('portfolio')} />
          </div>
          <div className="form-group">
            <label htmlFor="ap-linkedin" className="form-label">LinkedIn URL</label>
            <input id="ap-linkedin" type="url" className="form-input" placeholder="https://linkedin.com/in/you" value={form.linkedin} onChange={set('linkedin')} />
          </div>
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
          {status === 'sending' ? 'Submitting…' : 'Submit Application →'}
        </button>
        <p style={{ fontSize: 12, color: 'var(--mu)', textAlign: 'center', marginTop: 10 }}>
          We review all applications within 3–5 business days.
        </p>
      </form>
    </div>
  );
}
