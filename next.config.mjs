/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                //protocol: 'http',
                protocol: 'https',
                //hostname: 'localhost',
                hostname: 'cutify-api-sv8s.onrender.com',
                pathname: '/image/**',
            },
        ],
    },
};

export default nextConfig;