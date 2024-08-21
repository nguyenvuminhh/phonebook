import globals from "globals";
import stylisticJs from '@stylistic/eslint-plugin-js'
import js from '@eslint/js'

export default [
  {
    ignores: [
      'frontend/',
      'node_modules/',   
      'dist/',           
      '*.env',
    ],
  },
  {
    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',   // Ignore arguments starting with _
          varsIgnorePattern: '^_',   // Ignore variables starting with _
          caughtErrorsIgnorePattern: '^_', // Ignore caught errors starting with _
        },
      ],
      "linebreak-style": "off",
    }
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],
      'no-console': 'off',
      "linebreak-style": "off",
    },
  },
  { 
    ignores: ["dist/**", "build/**"],
  },
]