import detectNewline from 'detect-newline'
import yaml from 'js-yaml'
import Parser from './parser.js'

const metadataParser = Parser({
  detectNewline,
  parseYaml: yaml.safeLoad
})

export default metadataParser
