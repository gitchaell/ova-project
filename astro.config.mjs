// @ts-check
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import db from '@astrojs/db'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
	security: {
		checkOrigin: false,
	},
	vite: {
		optimizeDeps: {
			exclude: ['astro:db'],
		},
	},
	integrations: [
		react({
			experimentalReactChildren: true,
		}),
		tailwind({
			applyBaseStyles: false,
		}),
		db(),
	],
})
