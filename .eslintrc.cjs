module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    
    // SOLID Principles Enforcement
    'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true }],
    'complexity': ['warn', { max: 10 }],
    'max-params': ['warn', { max: 4 }],
    'max-depth': ['warn', { max: 3 }],
    
    // TypeScript SOLID rules
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/prefer-composition-over-inheritance': 'error',
    
    // Single Responsibility
    'prefer-const': 'error',
    'no-var': 'error',
    
    // Interface Segregation  
    '@typescript-eslint/no-unused-vars': 'error',
    
    // Dependency Inversion
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../infrastructure/*'],
            message: 'Do not import infrastructure directly. Use domain/ports instead.'
          },
          {
            group: ['**/api/*'],
            message: 'Do not import API directly in components. Use hooks or domain services.'
          }
        ]
      }
    ]
  },
  
  overrides: [
    {
      // Stricter rules for components
      files: ['src/components/**/*.tsx'],
      rules: {
        'max-lines-per-function': ['error', { max: 80 }],
        'complexity': ['error', { max: 8 }],
        '@typescript-eslint/explicit-function-return-type': 'error'
      }
    },
    {
      // Allow longer functions in hooks (business logic)
      files: ['src/hooks/**/*.ts'],
      rules: {
        'max-lines-per-function': ['warn', { max: 100 }]
      }
    }
  ]
};
