import { Linter } from 'eslint'
import astroEslintParser from 'astro-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default [
	{
		ignores: [],
		files: ['*.ts', '*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				tsconfigRootDir: __dirname,
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
		},
		plugins: {
			astro: astroEslintParser,
			prettier: 'eslint-plugin-prettier',
			tailwindcss: 'eslint-plugin-tailwindcss',
		},
		extends: [
			'eslint:recommended',
			'plugin:prettier/recommended', // Activa la configuración de Prettier
			'plugin:tailwindcss/recommended', // Añade reglas recomendadas de Tailwind
		],
		rules: {
			'prettier/prettier': ['error'],
			'tailwindcss/classnames-order': 'warn',
			'tailwindcss/no-custom-classname': 'warn',
			'prettier/prettier': ['error', { endOfLine: 'auto' }],
		},
	},
	{
		files: ['*.astro'],
		languageOptions: {
			parser: astroEslintParser,
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: ['.astro'],
			},
		},
		rules: {
			// Agregar reglas específicas para archivos .astro si es necesario
		},
	},
]
