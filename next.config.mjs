/** @type {import('next').NextConfig} */
const nextConfig = {
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
          'images.unsplash.com',
          'i.pravatar.cc',
          'picsum.photos'
        ],
      }
};

export default nextConfig;
