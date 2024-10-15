/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                //protocol: 'http',
                protocol: 'http',
                //hostname: 'mirex-api.onrender.com',
                hostname: 'https://cutify-api-sv8s.onrender.com',
                pathname: '/image/**',
            },
        ],
    },
};

export default nextConfig;