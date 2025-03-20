import jsConfig from '@nish1896/eslint-flat-config/js';
import jsxConfig from '@nish1896/eslint-flat-config/jsx';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...jsConfig,
  ...jsxConfig,
  {
    rules: {},
  },
];
