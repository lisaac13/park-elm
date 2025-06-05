/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["cms.parkelmcenturyplaza.com"],
    minimumCacheTTL: 2678400, // 31 days
  },
  env: {
    API_URL: "https://cms.parkelmcenturyplaza.com/graphql",
    NEXT_RECAPTCHA_SITE_KEY: "6Le6L6NlPpAAAABjImqTyZlxvGdTnrwbv-LW2olv2",
    NEXT_RECAPTCHA_SECRET_KEY: "6Le6L6NlPpAAAAMC4fTLVzFoDORMJ_0kciOlKo6-uUL",
  },
};

module.exports = nextConfig;

