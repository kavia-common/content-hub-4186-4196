import base from './eslint.config.mjs';

/**
 * PUBLIC_INTERFACE
 * This override file is used by CI linters to relax or ignore linting for generated
 * Astro declaration files under .astro which can contain `any` types.
 * It also disables the triple-slash reference rule in generated files context.
 */
export default [
  ...base,
  {
    ignores: ['.astro/**', 'dist/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
];
