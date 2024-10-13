/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                //protocol: 'http',
                protocol: 'http',
                //hostname: 'mirex-api.onrender.com',
                hostname: '192.168.1.81',
                pathname: '/image/**',
            },
        ],
    },
};

export default nextConfig;