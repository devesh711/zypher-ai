/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        disableStaticImages: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/a/"
            }
        ]
    }
};

module.exports = nextConfig;

const withImages = require("next-images");
module.exports = withImages({
    webpack(config, options) {
        return config;
    }
});
