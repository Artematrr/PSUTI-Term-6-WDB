import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
	{
		ignores: ['node_modules/**', 'dist/**'],
	},
	{
		files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
		plugins: {},
		languageOptions: {
			sourceType: 'module',
			ecmaVersion: 'latest',
			globals: {
				...globals.node,
			},
		},
		rules: {
			semi: 'error',
			'no-trailing-spaces': 'error',
			'no-multiple-empty-lines': ['error', { max: 1 }],
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'@typescript-eslint': typescriptPlugin,
		},
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				project: './backend/tsconfig.json',
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				...globals.node,
			},
		},
		rules: {
			...typescriptPlugin.configs.recommended.rules,
			semi: 'error',
			'no-trailing-spaces': 'error',
			'no-multiple-empty-lines': ['error', { max: 1 }],
		},
	},
];
