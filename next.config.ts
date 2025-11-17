import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
		],
	},
	/* config options here */
	reactCompiler: true,
};
const withMDX = createMDX({
	// Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
