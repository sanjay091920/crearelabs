/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*.supabase.co' }],
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return [
      { source: '/home',    destination: '/',                  permanent: true },
      { source: '/privacy', destination: '/privacy-policy',    permanent: true },
      { source: '/terms',   destination: '/terms-of-service',  permanent: true },
      { source: '/cookies', destination: '/cookie-policy',     permanent: true },
    ];
  },
};

module.exports = nextConfig;
