/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                //protocol: 'https',
                protocol: 'http',
                //hostname: 'mirex-api.onrender.com',
                hostname: '192.168.1.254',
                pathname: '/image/**',
            },
        ],
    },
};

export default nextConfig;