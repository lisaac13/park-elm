/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ["parkelmcms.wpenginepowered.com"],
	},
	env: {
		API_URL: "https://parkelmcms.wpenginepowered.com/graphql",
	},
};

module.exports = nextConfig;
