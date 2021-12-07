module.exports = {
	env: {
		browser: true,
		jest: true,
		node: true,
	},
	extends: [
		'react-app', // Use the recommended rules from eslint-config-react-app (bundled with Create React App)
		'eslint:recommended', // Use the recommened rules from eslint
		'plugin:@typescript-eslint/recommended', // Use the recommended rules from @typescript-eslint/eslint-plugin
		'plugin:react/recommended',
		'@tiphedor/eslint-config-base'
	],
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		ecmaFeatures: {
			jsx: true // Allows for the parsing of JSX
		},
		sourceType: 'module', // Allows for the use of imports
	},
	plugins: [
		'@typescript-eslint', // Allows for manually setting @typescript-eslint/* rules
		'react', // Allows for manually setting react/* rules
	],
	settings: {
		react: {
			version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
		},
	},
};
