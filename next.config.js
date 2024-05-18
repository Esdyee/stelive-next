/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    enableUndici: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        dns: false,
        net: false,
        tls: false,
        fs: false
      };
    }
    return config;
  },
}

module.exports = nextConfig;
