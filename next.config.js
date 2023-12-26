// next.config.js

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com"
            }
        ],
        unoptimized: true,
        disableStaticImages: true
    },
    ...require("next-images")({
        webpack(config, options) {
            // You can customize the webpack configuration here if needed
            return config;
        }
    })
};
