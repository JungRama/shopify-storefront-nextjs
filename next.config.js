/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	devIndicators: {
		autoPrerender: false, // Disable pre-render indicator
		buildActivity: true, // Show build activity indicator
	},
}

module.exports = nextConfig
