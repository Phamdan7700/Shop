/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['fakestoreapi.com', 'images.unsplash.com'],
  },
  assetPrefix: isProd ? '/shop/' : ''

}

const isProd = process.env.NODE_ENV === 'production'
