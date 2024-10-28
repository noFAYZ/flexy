/** @type {import('next').NextConfig} */
const nextConfig = {
   async redirects() {
    return [
      {
        source: '/',
        destination: '/coming-soon',
        permanent: false,
      },
    ]
  }, 
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
    webpack: (config) => {
        // Add rule for SVG files
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        });
        config.externals.push('pino-pretty', /* add any other modules that might be causing the error */);
        return config;
      }, 
      images: {
        domains: [
          'logo.clearbit.com',
          'avatar.iran.liara.run',
          'images.unsplash.com',
          'i.pravatar.cc',
          'picsum.photos',
          'assets.aceternity.com'
        ],
      }
};

export default nextConfig;
