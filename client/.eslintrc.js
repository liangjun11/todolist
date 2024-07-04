module.exports = {
  extends: [
    'standard',
    'plugin:prettier/recommended', // Uses eslint-config-prettier to disable ESLint rules that would conflict with prettier
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error', // Shows prettier errors as ESLint errors
    'comma-dangle': 'off', // Disable comma-dangle rule
    'space-before-function-paren': 'off', // Disable space-before-function-paren rule
  },
}
