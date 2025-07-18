import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.extends('prettier'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.plugins(
    'prettier',
    'simple-import-sort',
    '@typescript-eslint',
    'import',
    'react',
  ),
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      'import/extensions': [
        'error',
        'never',
        {
          svg: 'always',
          json: 'always',
          ttf: 'always',
          png: 'always',
        },
      ],
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
          allowFunctions: true,
        },
      ],
      'react/jsx-key': 'error',
      'react/require-default-props': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-redeclare': 'error',
    },
  },
];

export default eslintConfig;
