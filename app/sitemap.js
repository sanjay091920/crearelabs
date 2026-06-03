import { BLOG_POSTS, JOBS } from '@/lib/data';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://crearelabs.in';

export default function sitemap() {
  const staticRoutes = [
    { url: SITE,                         changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/services`,           changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/industries`,         changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/process`,            changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/blog`,               changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE}/careers`,            changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE}/contact`,            changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/faq`,                changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/privacy-policy`,     changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE}/terms-of-service`,   changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE}/cookie-policy`,      changeFrequency: 'yearly',  priority: 0.3 },
  ].map(r => ({ ...r, lastModified: new Date() }));

  const blogRoutes = BLOG_POSTS.map(post => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const jobRoutes = JOBS.map(job => ({
    url: `${SITE}/careers/${job.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...jobRoutes];
}
