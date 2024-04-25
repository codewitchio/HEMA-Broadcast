/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github-readme-stats.vercel.app',
                port: '',
                pathname: '/api/pin/**',
            }
        ]
    }
}

export default nextConfig