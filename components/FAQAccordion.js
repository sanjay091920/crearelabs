'use client';
import { useState } from 'react';

export default function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="faq-list">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="faq-item">
            <button
              className="faq-btn"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-ans-${i}`}
              id={`faq-btn-${i}`}
            >
              <span>{faq.q}</span>
              <span className={`faq-chevron${isOpen ? ' open' : ''}`} aria-hidden="true">
                <ChevDown />
              </span>
            </button>
            <div
              id={`faq-ans-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              hidden={!isOpen}
            >
              <div className="faq-ans">{faq.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const ChevDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
