import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import jsConfig from '@nish1896/eslint-flat-config/js';
import nextTsConfig from '@nish1896/eslint-flat-config/next-ts';
import nextConfig from '@nish1896/eslint-flat-config/next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...jsConfig,
  ...nextTsConfig,
  ...nextConfig,
  {
    /**
     * Somehow loading this rule is causing issues, when using
     * NextApp in monorepo, thus disabling this for now.
     */
    rules: {
      '@typescript-eslint/no-empty-function': 'off'
    }
  }
];

export default eslintConfig;
