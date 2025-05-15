/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // ✅ Allow production builds to complete even if ESLint errors are present
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
