import detectNewline from 'detect-newline'
import yaml from 'js-yaml'

/**
 * @typedef {Object} ParseResult
 * @property {string} content Markdown source text without metadata.
 * @property {Object} metadata Plain object of parsed metadata.
 */

/**
 * @param {string} text Markdown source text to parse.
 * @returns {ParseResult}
 * @throws {TypeError} Markdown source text must be a string.
 * @throws {YAMLException} YAML parser function error.
 */
const metadataParser = (text) => {
  let METADATA_START
  let METADATA_END
  let METADATA_FILE_END
  let result = {
    content: text,
    metadata: ''
  }

  const validateMarkdownText = () => {
    if (typeof text !== 'string' && !(text instanceof String)) {
      throw new TypeError('Markdown source text must be a string.')
    }
  }

  const setMetadataPatterns = () => {
    const newline = detectNewline.graceful(text)
    METADATA_START = new RegExp(`^---${newline}`)
    METADATA_END = `${newline}---${newline}`
    METADATA_FILE_END = `${newline}---`
  }

  const splitTextWithMetadata = () => {
    const metadataEndIndex = text.indexOf(METADATA_END)
    if (metadataEndIndex !== -1) {
      result = {
        content: text.substring(metadataEndIndex + METADATA_END.length),
        metadata: text.substring(0, metadataEndIndex)
      }
    }
  }

  const splitTextWithOnlyMetadata = () => {
    if (!result.metadata && text.endsWith(METADATA_FILE_END)) {
      result = {
        content: '',
        metadata: text.substring(0, (text.length - METADATA_FILE_END.length))
      }
    }
  }

  const extractContentAndMetadata = () => {
    if (METADATA_START.test(text)) {
      splitTextWithMetadata()
      splitTextWithOnlyMetadata()
    }
  }

  const removeStartPatternFromMetadata = () => {
    result = {
      ...result,
      metadata: result.metadata.replace(METADATA_START, '').trim()
    }
  }

  const parseMetadata = () => {
    const parseResult = result.metadata ? yaml.safeLoad(result.metadata) : {}
    result = {
      ...result,
      metadata: parseResult
    }
  }

  const parse = () => {
    validateMarkdownText()
    setMetadataPatterns()
    extractContentAndMetadata()
    removeStartPatternFromMetadata()
    parseMetadata()
  }

  parse()
  return result
}

export default metadataParser
