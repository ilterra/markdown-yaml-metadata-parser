const platform = require('platform');

/**
 * The configuration to be used for operation
 */
const defaultConfig = {
  src: "",
  windows: false,
  // infer the platform type by the eol present in the source string
  isWin: () => (
    defaultConfig.windows
    || platform.os.toString().indexOf('Windows') !== -1
    || defaultConfig.src.match(/\r\n/) !== null
  )
}

Object.seal(defaultConfig);

const METADATA_START = () => defaultConfig.isWin() ? /^---\r\n/ : /^---\n/;
const METADATA_END = () => defaultConfig.isWin() ? /\r\n---\r\n/ : /\n---\n/;
const METADATA_FILE_END = () => defaultConfig.isWin() ? /\r\n---$/ : /\n---$/;
const JOIN_SEPARATOR = () => defaultConfig.isWin() ? '\r\n---\r\n' : '\n---\n';

/**
 * Check if the provided array has only one element that ends with METADATA_FILE_END.
 * If so, the source is metadata only with no content. The function cleans the metadata and adds an empty content element to the array.
 *
 * @param {Array}
 * @returns {Array}
 */
const checkMetadataOnly = (src) => {
  if (src.length === 1 && src[0].match(METADATA_FILE_END()) !== null) {
    return [src[0].replace(METADATA_FILE_END(), ''), ''];
  }
  return src;
}

/**
 * Split a string with the METADATA_END separator if it starts with METADATA_START.
 * Otherwise it creates an array containing the source string provided.
 *
 * @param {string} Source string to split.
 * @returns {Array}
 */
const splitSource = (src) => {
  if (src.match(METADATA_START()) !== null) {
    return checkMetadataOnly(src.split(METADATA_END()))
  }
  return [src];
}

/**
 * If source array has more than one value, it cleans (remove METADATA_START() and trim) and returns the first one.
 * Otherwise it returns null.
 *
 * @param {Array.<string>}
 * @returns {string|null}
 */
const cleanMetadata = (src) => {
  if (src.length >= 1) {
    return src[0].replace(METADATA_START(), '').trim();
  }
  return null;
}

/**
 * If the supplied value is nil, it returns an empty object, otherwise it returns the value itself.
 *
 * @param {*}
 * @returns {*}
 */
const emptyObjectIfNil = (src) => src.length === 0 ? {} : src

/**
 * Join the elements of the array except the first one (metadata).
 * If there's only one element (no metadata), it returns it.
 *
 * @param {Array.<string>}
 * @returns {string}
 */
const joinContent = (srcLines) => {
  if (srcLines.length > 1) {
    return srcLines.slice(1, srcLines.length).join(JOIN_SEPARATOR());
  }
  return srcLines.join('');
}

/**
 * Validate incoming input.
 * 
 * @param {string} src Document source to parse.
 * @param {{windows: Boolean}} config Operation configuration.
 */

const validateInput = (src, config) => {
  if (typeof src !== "string") {
    throw new TypeError('Source parameter (src) must be a string.');
  }

  if (Object.keys(config).length > 0 && typeof config.windows !== "boolean") {
    throw new TypeError('Configuration property (windows) must be a boolean.');
  }
}

/**
 * Parse a markdown document (src) looking for metadata in YAML format.
 * In order to be parsed, metadata must be placed at the beginning of the document between two triple dashes.
 * Example:
 * ---
 * title: Lorem ipsum
 * author: Marcus Antonius
 * keywords: latin, ipsum
 * ---
 * 
 * NB: setting windows to true in configuration prop will override the ability 
 * to infer the type from the document (src)
 *
 * @param {{safeLoad: Function}} yamlParser YAMLParser object with safeLoad function.
 * @param {string} src Document source to parse.
 * @param {{windows: Boolean}} config Operation configuration.
 * @returns {{metadata: Object, content: string}}
 * @throws {TypeError} src must be a string.
 * @throws {YAMLException} Error on YAML metadata parsing.
 */
const parse = yamlParser => (src, config = {}) => {

  validateInput(src, config)

  defaultConfig.src = src.trim();

  if (config.windows) {
    defaultConfig.windows = config.windows;
  }

  const splittedSource = splitSource(defaultConfig.src);

  const cleanedMetadata = cleanMetadata(splittedSource);
  const parsedYaml = yamlParser.safeLoad(cleanedMetadata);
  const metaData = emptyObjectIfNil(parsedYaml);

  const content = joinContent(splittedSource);

  return {
    metadata: metaData,
    content: content
  };
};

module.exports = parse;
