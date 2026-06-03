// lib/data.js — Single source of truth
// Editable content (brand, blog, jobs, faqs, testimonials, stats) lives in lib/content.json
// Edit via Admin Dashboard → saves to GitHub → auto-deploys in ~60 seconds
// Static structural content (services, industries, comparison, process) stays here

import content from './content.json';

// ── Dynamic content from content.json (editable via admin dashboard) ────────
export const BRAND        = content.brand;
export const STATS        = content.stats;
export const TESTIMONIALS = content.testimonials;
export const FAQS         = content.faqs;
export const BLOG_POSTS   = content.blog_posts;
export const JOBS         = content.jobs;

// ── Static structural content (edit in this file) ────────────────────────────
export const SERVICES = [
  {
    id: 1, icon: '⚡',
    title: 'Product & Platform Engineering',
    short: 'Engineering',
    desc:  'Websites, customer apps, ordering systems, inventory portals, WhatsApp automation, dashboards — the technology your business runs on.',
    detail: 'From a simple landing page to a full-stack ordering platform, we build robust, scalable technology tailored to your operational needs. Our engineering team specialises in React, Next.js, and cloud-native architectures.',
    points: ['Custom website & web apps', 'Customer ordering systems', 'WhatsApp automation bots', 'Inventory & analytics dashboards', 'API integrations & automation'],
  },
  {
    id: 2, icon: '🔍',
    title: 'Websites & SEO',
    short: 'SEO',
    desc:  'Locality + industry SEO, brand sites, video content — make your business findable and credible across every platform.',
    detail: 'We don\'t do generic SEO. We build locality-anchored strategies targeting the exact neighbourhoods and search intents your customers use — paired with technically excellent websites that convert.',
    points: ['Google Business Profile optimisation', 'Locality-anchored keyword strategy', 'Technical SEO audits & fixes', 'Content strategy & publishing', 'Review velocity programmes'],
  },
  {
    id: 3, icon: '📣',
    title: 'Performance Marketing',
    short: 'Marketing',
    desc:  'Paid ads, lead generation, funnel design — calibrated to your industry\'s buying cycle and platform mix.',
    detail: 'Meta, Google, Zomato, Swiggy, Amazon — we run campaigns on every platform your customers actually use. Every funnel is designed against your industry\'s specific buying cycle.',
    points: ['Meta (Facebook & Instagram) Ads', 'Google Search & Shopping Ads', 'Zomato & Swiggy ad campaigns', 'Amazon & Flipkart advertising', 'Conversion funnel design & A/B testing'],
  },
  {
    id: 4, icon: '⭐',
    title: 'Brand & Reputation',
    short: 'Reputation',
    desc:  'Reviews, reputation management, loyalty programs — control how your brand is perceived after the first purchase.',
    detail: 'Your brand is what people say when you\'re not in the room. We build review velocity engines, manage your online reputation across Google, Zomato, and Amazon, and design loyalty programmes that keep customers coming back.',
    points: ['Online reputation management', 'Google & Zomato review strategy', 'Loyalty programme design', 'Brand identity & guidelines', 'Crisis management playbooks'],
  },
];

export const INDUSTRIES = [
  {
    id: 1, icon: '🍽️', color: '#FF6B35',
    name:  'Restaurants & F&B',
    short: 'F&B',
    desc:  'Menu-led SEO, Google Maps dominance, review velocity engines, delivery platform optimisation, and repeat-customer programmes for dining brands.',
    detail: 'We work with QSRs, fine-dining restaurants, cloud kitchens, and beverage brands. Our F&B playbook covers Zomato and Swiggy optimisation, Google Business Profile dominance, review management, and loyalty programmes.',
    points: ['Zomato & Swiggy listing optimisation', 'Google Maps rank engineering', 'Review velocity programmes', 'Menu SEO & photography direction', 'Repeat-diner loyalty engines'],
  },
  {
    id: 2, icon: '📦', color: '#2EC4B6',
    name:  'Product Brands',
    short: 'Products',
    desc:  'D2C funnels, packaging storytelling, Amazon & Flipkart optimisation, influencer pipelines, and product launch playbooks.',
    detail: 'From FMCG to lifestyle products, we help brands sell direct and through marketplaces. Our product playbook covers D2C website builds, Amazon and Flipkart listing optimisation, influencer campaign management, and launch-day playbooks.',
    points: ['D2C website & funnel engineering', 'Amazon & Flipkart optimisation', 'Influencer campaign management', 'Product photography direction', 'Launch-day marketing playbooks'],
  },
  {
    id: 3, icon: '🛒', color: '#9B5DE5',
    name:  'E-Commerce & Retail',
    short: 'E-Com',
    desc:  'Conversion-optimised storefronts, cart-recovery flows, performance ad funnels, and loyalty engines for online and offline retail.',
    detail: 'Whether you sell online, offline, or both, we build the systems that grow revenue. Our e-commerce playbook covers Shopify and custom storefront builds, cart-recovery automation, and loyalty programmes.',
    points: ['Shopify & custom storefront builds', 'Cart-recovery automation', 'Google Shopping & Meta catalogue', 'In-store + online loyalty programmes', 'Performance ad funnels'],
  },
  {
    id: 4, icon: '🏥', color: '#00BBF9',
    name:  'Healthcare',
    short: 'Health',
    desc:  'DMR Act–compliant campaigns, locality SEO, patient-journey optimisation, and reputation management for clinics and hospitals.',
    detail: 'Healthcare marketing requires compliance first. Our healthcare playbook covers DMR Act and MCI ethics review before every campaign ships, locality-anchored SEO for clinics and hospitals, and patient-journey optimisation.',
    points: ['DMR Act & MCI compliance review', 'Locality SEO for clinics', 'Patient-journey optimisation', 'Google Business Profile management', 'Review & reputation management'],
  },
];

export const COMPARISON = [
  { feature: 'Industry calibration',   generic: 'One playbook for every client. Restaurants get the SaaS funnel.',                           creare: 'Dedicated playbooks for F&B, product brands, e-commerce, and retail — plus a calibration process for any other industry.' },
  { feature: 'Tech + marketing',        generic: 'Either a marketing agency that outsources tech, or a dev shop that outsources marketing.',   creare: 'Both under one team. The app and the funnel are designed against each other.' },
  { feature: 'Platform expertise',      generic: 'Generic social + Google Ads.',                                                              creare: 'Zomato, Swiggy, Amazon, Flipkart, Shopify, Meta — platform-native strategies per industry.' },
  { feature: 'Reporting cadence',       generic: 'Monthly PDF, ad-spend-led.',                                                               creare: 'Weekly review with business-value metrics (covers, orders, repeat-rate), not impressions.' },
  { feature: 'Strategy involvement',    generic: 'Account manager handoff after kickoff.',                                                    creare: 'Founder-led quarterly business reviews.' },
  { feature: 'Engagement horizon',      generic: 'Six-month sprint, then churn.',                                                            creare: 'Built for year-over-year compounding.' },
];

export const PROCESS = [
  { step: '01', phase: 'Week 0',    title: 'Discovery',   desc: '60-min session. We learn your product, locality, current marketing, what worked, what didn\'t. No pitch.' },
  { step: '02', phase: 'Weeks 1–2', title: 'Foundation',  desc: 'Platform audit + cleanup. Tracking instrumentation. Compliance review. Baseline metrics locked.' },
  { step: '03', phase: 'Month 1',   title: 'Launch',      desc: 'First campaigns live. Paid funnels priced. Locality-anchored SEO publishing cadence begins. Weekly reviews.' },
  { step: '04', phase: 'Month 2+',  title: 'Scale',       desc: 'Compounding. Quarterly reviews with the founder. Retainer tuned to retention and revenue, not handoff.' },
];

