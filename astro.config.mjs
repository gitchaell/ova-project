// @ts-check
import { defineConfig } from 'astro/config'
import db from '@astrojs/db'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import remarkToc from 'remark-toc'

import vercel from '@astrojs/vercel/serverless'
// import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercel({
		webAnalytics: { enabled: true },
	}), // to deploy
	// adapter: node({ mode: 'standalone' }), // to dev
	security: {
		checkOrigin: false,
	},
	vite: {
		optimizeDeps: {
			exclude: ['astro:db'],
		},
	},
	integrations: [
		react({ experimentalReactChildren: true }),
		tailwind({ applyBaseStyles: false }),
		db(),
	],
	markdown: {
		syntaxHighlight: 'shiki',
		shikiConfig: {
			theme: 'github-dark-default',
		},
		remarkPlugins: [[remarkToc, { heading: 'contents' }]],
		rehypePlugins: [],
	},
})
