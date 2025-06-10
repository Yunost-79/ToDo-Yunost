import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    (module.exports = {
        env: {
            browser: true,
            es2021: true,
        },
        extends: ['airbnb', 'airbnb/hooks', 'plugin:react/recommended', 'plugin:prettier/recommended'],
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: ['react', 'prettier'],
        rules: {
            'react/prefer-stateless-function': 'off',
            'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
            'react/state-in-constructor': 'off',
            'react/jsx-props-no-spreading': 'off',
            'class-methods-use-this': 'off',
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
            'import/no-unresolved': 'off',
            'import/extensions': 'off'
        },
    }),
]);
