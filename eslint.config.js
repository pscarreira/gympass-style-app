'use strict'
const { defineConfig } = require('eslint/config')

module.exports = defineConfig([
  require('neostandard')({
    ts: true,
    ignores: ['build/**/*', 'node_modules/**/*'],
  }),
  {
    rules: {
      camelcase: 'off',
    },
  },
])
