// lib/data.js
// Single source of truth for all static content.
// When you connect Supabase, replace each export with a DB query.

export const BRAND = {
  name:      'Crearelabs',
  tagline:   'Tech. Creative. Growth.',
  phone:     '+91 8448807923',
  whatsapp:  '918448807923',
  email:     'ahirwarsanjay0901@gmail.com',
  address:   'Noida, Uttar Pradesh, India',
  founded:   '2022',
  instagram: 'https://instagram.com/crearelabs',
  linkedin:  'https://linkedin.com/company/crearelabs',
};

export const STATS = [
  { value: '3×',   label: 'Avg revenue growth', sub: 'Restaurant clients in 6 months' },
  { value: '18+',  label: 'Cities served',       sub: 'Across North India' },
  { value: '150+', label: 'Brands launched',     sub: 'Products and F&B' },
  { value: '97%',  label: 'Retention rate',      sub: 'Annual retainer clients' },
];

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

export const TESTIMONIALS = [
  { name: 'Rahul Sharma', role: 'Owner, The Spice Route, Noida',       icon: '🍽️', quote: 'Our Zomato ratings went from 3.8 to 4.5 in 3 months. Footfall doubled. Crearelabs actually understands restaurants.' },
  { name: 'Priya Gupta',  role: 'Founder, SnackCo — D2C Snacks Brand', icon: '📦', quote: 'We launched on Amazon and our own site simultaneously. Month 3 we crossed ₹10L/month. The launch playbook was excellent.' },
  { name: 'Amit Verma',   role: 'Director, FashionHub Retail',          icon: '🛒', quote: 'SEO traffic tripled in 4 months. The weekly reporting is incredibly transparent — we always know where every rupee goes.' },
];

export const FAQS = [
  { q: 'How long before we see results?',              a: 'For restaurants, Google Maps + review velocity improvements show within 30–45 days. Paid ad funnels can drive measurable footfall in week 2. Product brands usually see meaningful D2C growth in 60–90 days.' },
  { q: 'Do you only work with restaurants?',           a: 'No — restaurants and product brands are our deepest specialties, but we work with any business. We have dedicated playbooks for e-commerce, retail, and healthcare too.' },
  { q: 'What is the minimum investment?',              a: 'Retainers start at ₹25,000/month for foundational SEO + GBP. Full performance marketing engagements start at ₹50,000/month inclusive of ad spend management.' },
  { q: 'Do you guarantee rankings or lead numbers?',   a: 'We don\'t guarantee specific rankings — no ethical agency does. We commit to transparent weekly reporting, clear KPIs agreed upfront, and a process built around compounding growth.' },
  { q: 'Can we work with you if we\'re outside Noida?', a: 'Yes. Our core market is the NCR, but we work with clients across India remotely. Discovery calls are 100% online.' },
  { q: 'How is industry-aware marketing different?',   a: 'Generic agencies apply the same playbook to every client. We calibrate everything — platform mix, ad creative style, compliance posture, and reporting metrics — to your specific industry\'s buying cycle.' },
];

export const BLOG_POSTS = [
  {
    slug:     'restaurant-seo-guide-2024',
    title:    'The Complete Restaurant SEO Guide for 2024',
    excerpt:  'How Noida restaurants can dominate Google Maps and Zomato search with a locality-first SEO strategy.',
    category: 'Restaurant & F&B',
    date:     '15 Mar 2024',
    readTime: '6 min read',
    icon:     '🍽️',
    featured: true,
    content:  `Restaurant SEO is fundamentally different from standard SEO. Your customers are searching within a 3–5 km radius, they're hungry right now, and they're comparing you against 10 other listings on Google Maps and Zomato simultaneously.

**1. Own your Google Business Profile**

Your GBP is the single most important real estate in local search. Fill every field, add photos weekly, respond to every review within 24 hours, and post weekly updates. Most restaurants ignore this entirely — that's your opportunity.

**2. Build review velocity, not just review count**

Google's local algorithm rewards recency. 50 reviews from last month beat 500 reviews from 3 years ago. Build a system to ask every satisfied diner for a review — a QR code on the bill, a WhatsApp follow-up, a loyalty programme that incentivises feedback.

**3. Menu-led keyword strategy**

Your menu items are your keywords. 'Butter chicken near me', 'best biryani in Noida Sector 18', 'cloud kitchen in Greater Noida' — these are real queries your customers type. Build pages and descriptions around them.

**4. Zomato & Swiggy listing optimisation**

Your delivery platform listing is a search engine too. Photos, descriptions, item names, and response time all affect your ranking within the platform. Most restaurants upload 5 blurry photos and wonder why they don't convert.`,
  },
  {
    slug:     'd2c-product-launch-playbook',
    title:    'The D2C Product Launch Playbook: From Zero to ₹10L/Month',
    excerpt:  'A step-by-step framework for launching a D2C product brand in India — from pre-launch to month 3 and beyond.',
    category: 'Product Brands',
    date:     '28 Feb 2024',
    readTime: '8 min read',
    icon:     '📦',
    featured: true,
    content:  `Launching a D2C product in India has never been more accessible — or more competitive. Here's the playbook we use with every product brand we launch.

**Pre-Launch (8 weeks before)**

Build your audience before you have a product to sell. Start content on Instagram and YouTube. Run a waitlist campaign. Lock down your Amazon and Flipkart seller accounts — the verification process takes longer than you expect.

**Launch Week**

Don't launch on all channels simultaneously. Start with your own D2C site and one marketplace. Get your first 100 orders. Fix the operational issues. Then expand.

**Month 1: Data over everything**

The first month is about learning, not scaling. Which product variant sells? Which ad creative wins? Which city converts? Answer these questions before you increase ad spend.

**Month 2–3: Scale what works**

Once you have data, double down. Scale the winning ad creative. Expand to the next marketplace. Start influencer seeding. This is when the compounding begins.`,
  },
  {
    slug:     'google-maps-ranking-factors',
    title:    'Google Maps Ranking Factors for Local Businesses in 2024',
    excerpt:  'The three pillars of Google Maps ranking — relevance, distance, and prominence — and how to optimise each one.',
    category: 'SEO',
    date:     '10 Feb 2024',
    readTime: '5 min read',
    icon:     '📍',
    featured: false,
    content:  `Google Maps uses three core factors to rank local businesses: relevance, distance, and prominence. Understanding each one is the foundation of any local SEO strategy.

**Relevance**

How well does your business match the search query? This is influenced by your business category, your GBP description, the keywords in your reviews, and the content on your website.

**Distance**

How close is your business to the searcher? You can't change your location, but you can expand your relevance radius by targeting location-specific keywords and building citations in local directories.

**Prominence**

How well-known is your business? This is determined by your review count and rating, the number of photos, your link profile, and your overall online presence. Prominence is the factor you have the most control over.`,
  },
];

export const JOBS = [
  {
    slug: 'performance-marketing-manager',
    title: 'Performance Marketing Manager',
    department: 'Marketing',
    location: 'Noida (Hybrid)',
    type: 'Full-time',
    experience: '2–4 years',
    salary: '₹6–10 LPA',
    desc: "We're looking for a performance marketer who lives and breathes ROAS. You'll manage paid campaigns across Meta, Google, and marketplace platforms for our restaurant and product brand clients.",
    responsibilities: [
      'Manage Meta and Google Ads campaigns across 10+ clients',
      'Build and optimise conversion funnels for D2C brands',
      'Run Zomato and Swiggy ad campaigns',
      'Weekly reporting with business-value metrics',
      'A/B test creatives and landing pages',
    ],
    requirements: [
      '2–4 years in performance marketing',
      'Hands-on experience with Meta Ads Manager and Google Ads',
      'Strong analytical skills — you live in spreadsheets',
      'Experience with e-commerce or F&B brands preferred',
      'Excellent written and verbal communication',
    ],
  },
  {
    slug: 'seo-content-strategist',
    title: 'SEO & Content Strategist',
    department: 'SEO',
    location: 'Noida (Hybrid)',
    type: 'Full-time',
    experience: '1–3 years',
    salary: '₹4–7 LPA',
    desc: "We need an SEO strategist who understands that local search and industry-specific content are fundamentally different from generic keyword stuffing.",
    responsibilities: [
      'Build locality-anchored SEO strategies for restaurant and product brand clients',
      'Write and edit blog content and on-page copy',
      'Technical SEO audits and implementation',
      'Google Business Profile management',
      'Monthly and weekly SEO reporting',
    ],
    requirements: [
      '1–3 years in SEO, ideally with local businesses',
      'Strong writing skills in English (Hindi is a bonus)',
      'Experience with tools like Ahrefs, SEMrush, or Moz',
      'Understanding of Google Business Profile optimisation',
      'Ability to produce 4–6 pieces of content per week',
    ],
  },
  {
    slug: 'frontend-engineer-react',
    title: 'Frontend Engineer (React)',
    department: 'Engineering',
    location: 'Noida / Remote',
    type: 'Full-time',
    experience: '2–5 years',
    salary: '₹8–16 LPA',
    desc: "Build the customer-facing products our clients run their businesses on — ordering systems, loyalty apps, dashboards, and brand websites.",
    responsibilities: [
      'Build React-based web applications for client projects',
      'Implement responsive, accessible UI from design files',
      'Integrate REST and GraphQL APIs',
      'Work closely with backend engineers and designers',
      'Participate in code reviews and architecture discussions',
    ],
    requirements: [
      '2–5 years in frontend development',
      'Strong proficiency in React and JavaScript/TypeScript',
      'Experience with Tailwind CSS or styled-components',
      'Understanding of performance optimisation and Core Web Vitals',
      'Portfolio of shipped products (not just side projects)',
    ],
  },
];
