/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                //protocol: 'https',
                protocol: 'http',
                //hostname: 'mirex-api.onrender.com',
                hostname: 'localhost',
                pathname: '/image/**',
            },
        ],
    },
};

export default nextConfig;