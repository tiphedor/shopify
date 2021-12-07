module.exports = {
	env: {
		browser: true,
		jest: true,
		node: true,
	},
	extends: [
		'react-app',
		'plugin:react/recommended',
		'@tiphedor/eslint-config-base',
		'@tiphedor/eslint-config-typescript',
		'prettier',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		ecmaFeatures: { jsx: true },
		sourceType: 'module',
	},
	plugins: ['prettier', '@typescript-eslint', 'react'],
	settings: { react: { version: 'detect' } },
	rules: {
		'prettier/prettier': 2,
		'no-promise-executor-return': 'off',
	},
	overrides: [
		{
			files: 'src/features/**/*.{js,jsx,ts,tsx}',
			rules: {
				'no-param-reassign': 'off',
			},
		},
	],
};
