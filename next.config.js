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
		NEXT_RECAPTCHA_SITE_KEY: "6Ldd2HIrAAAAALGFeMoce7XlbWrl8Mag48gznPIh",
		NEXT_RECAPTCHA_SECRET_KEY: "6Ldd2HIrAAAAAAIGHuInxmG-gkKVgexH55ASSx8l",
		NEXT_RECAPTCHA_NEW_SITE_KEY: "6LeiT3UrAAAAACwCMY02rrWshbE3MqERaOreG4gD",
	},
};

module.exports = nextConfig;
