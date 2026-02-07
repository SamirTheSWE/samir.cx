// @ts-check
import eslint from '@eslint/js';
import eslintConfigNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['.next/**/*', 'dist/**/*', 'public/js/vendor/**/*', 'next-env.d.ts'],
    },
    {
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommended,
            eslintPluginPrettierRecommended,
        ],
        ...eslintConfigPrettier,
        plugins: {
            '@next/next': eslintConfigNext,
        },
        // @ts-ignore
        rules: {
            ...eslintConfigNext.configs.recommended.rules,
            ...eslintConfigNext.configs['core-web-vitals'].rules,
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: 'block', next: '*' },
                { blankLine: 'always', prev: '*', next: 'block' },
                { blankLine: 'always', prev: '*', next: 'export' },
            ],
        },
    },
);
