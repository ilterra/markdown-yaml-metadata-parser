'use strict'
const yaml = require('js-yaml')
const parser = require('./parser')

const metadataParse = parser(yaml)

module.exports = metadataParse
