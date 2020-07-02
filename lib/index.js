'use strict'
const detectNewline = require('detect-newline')
const yaml = require('js-yaml')

const metadataParser = require('./parser')({
  detectNewline,
  parseYaml: yaml.safeLoad
})

module.exports = metadataParser
