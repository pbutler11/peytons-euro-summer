import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // Allow .mdx files as pages and components
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

const withMDX = createMDX({
  // Add MDX plugins here later if we want (e.g. syntax highlighting)
});

export default withMDX(nextConfig);