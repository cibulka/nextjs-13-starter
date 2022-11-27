/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental:{
    appDir: true,
    fontLoaders: [
      { 
        loader: '@next/font/google', 
        options: { subsets: ['latin-ext', 'cyrillic'] } 
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

export default nextConfig;