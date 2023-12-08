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
		domains: ["parkelmcms.wpenginepowered.com"],
	},
	env: {
		API_URL: "https://parkelmcms.wpenginepowered.com/graphql",
		NEXT_RECAPTCHA_SITE_KEY: "6Le6NiIpAAAAAEjImqTyZkxGdTnrwbu-LW2olv2-",
		NEXT_RECAPTCHA_SECRET_KEY: "6Le6NiIpAAAAAMc4TflVzFoDDRM_okciOKo6-uJL",
	},
};

module.exports = nextConfig;
