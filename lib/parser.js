const R = require('ramda');
const platform = require('platform')

/**
 * The configuration to be used for operation
 */
const defaultConfig = { 
  src: "", 
  windows: false, 
  // infer the platform type by the eol present in the source string
  isWin: () => (defaultConfig.windows || R.includes('Windows', platform.os) || defaultConfig.src.match(/\r\n/) !== null  )
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
const checkMetadataOnly = R.ifElse(
  R.both(R.compose(R.equals(1), R.length), R.test(METADATA_FILE_END())),
  R.compose(R.append(''), R.of, R.replace(METADATA_FILE_END(), ''), R.head),
  R.identity
);

/**
 * Split a string with the METADATA_END separator if it starts with METADATA_START.
 * Otherwise it creates a singleton array containing the source string provided.
 *
 * @param {string} Source string to split.
 * @returns {Array}
 */
const splitSource = R.ifElse(
  R.test(METADATA_START()),
  R.compose(checkMetadataOnly, R.split(METADATA_END())),
  R.of
);

/**
 * If source array has more than one value, it cleans (remove METADATA_START() and trim) and returns the first one.
 * Otherwise it returns null.
 *
 * @param {Array.<string>}
 * @returns {string|null}
 */
const cleanMetadata = R.ifElse(
  R.compose(R.lt(1), R.length),
  R.compose(R.trim, R.replace(METADATA_START(), ''), R.head),
  () => null
);

/**
 * If the supplied value is nil, it returns an empty object, otherwise it returns the value itself.
 *
 * @param {*}
 * @returns {*}
 */
const emptyObjectIfNil = R.ifElse(R.isNil, () => ({}), R.identity);

/**
 * Join the elements of the array except the first one (metadata).
 * If there's only one element (no metadata), it returns it.
 *
 * @param {Array.<string>}
 * @returns {string}
 */
const joinContent = R.ifElse(
  R.compose(R.lt(1), R.length),
  R.compose(R.join(JOIN_SEPARATOR()), R.drop(1)),
  R.head
);

/**
 * Validate incoming input.
 * 
 * @param {string} src Document source to parse.
 * @param {{windows: Boolean}} config Operation configuration.
 */

const validateInput = (src, config) => {
  if (!R.is(String, src)) {
    throw new TypeError('Source parameter (src) must be a string.');
  }

  if (Object.keys(config).length > 0 && !R.is(Boolean, config.windows)) {
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
const parse = yamlParser => (src, config = { }) => {

  validateInput(src, config)

  defaultConfig.src = src.trim();

  if(config.windows) {
    defaultConfig.windows = config.windows;
  }

  const getMetadata = R.compose(
    emptyObjectIfNil,
    yamlParser.safeLoad,
    cleanMetadata,
    splitSource
  );

  const getContent = R.compose(joinContent, splitSource);

  return {
    metadata: getMetadata(defaultConfig.src),
    content: getContent(defaultConfig.src)
  };
};

module.exports = parse;
