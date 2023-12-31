const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
    reactStrictMode: true,
    pwa: {
        // disable: process.env.NODE_ENV === 'development',
        dest: 'public',
        sw: '/sw.js',
        runtimeCaching,
        // swSrc: 'service-worker.js',
        // register: true,
        // skipWaiting: true,
    },
})
