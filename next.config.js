/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
    ignoreDuringBuilds: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: [
      "utfs.io"
    ]
  }
}

module.exports = nextConfig
