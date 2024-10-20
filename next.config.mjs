/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                //protocol: 'http',
                protocol: 'https',
                //hostname: 'localhost',
                hostname: 'https://cutify-api-g5dk.onrender.com',
                pathname: '/image/**',
            },
        ],
    },
};

export default nextConfig;