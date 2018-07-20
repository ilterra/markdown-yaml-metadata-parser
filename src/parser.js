// @flow
import R from 'ramda';
import Result from 'folktale/result';

const METADATA_START = /^---\n/;
const METADATA_END = /\n---\n/;
const JOIN_SEPARATOR = '\n---\n';

/**
 * Flow type aliases
 */
type ParseResult = {
  metadata: Object,
  content: string
};

/**
 * getResultOfString :: a -> Result a TypeError
 * 
 * Given a value, it returns the Result.Ok of the value if it's a string, otherwise a Result.Error.
 */
const getResultOfString = (src: mixed): { value: string } => {
  if (typeof src === 'string' || src instanceof String) {
    return Result.Ok(src);
  }

  return Result.Error(new TypeError('Source parameter (src) must be a string.'));
};

/**
 * cleanMetadata :: [String] -> String | null
 * 
 * If source array has more than one value, it cleans (remove METADATA_START and trim) and returns the first one.
 * Otherwise it returns null.
 */
const cleanMetadata: Array<string> => string | null = R.ifElse(
  R.compose(R.lt(1), R.length),
  R.compose(R.trim, R.replace(METADATA_START, ''), R.head),
  () => null
);

/**
 * emptyObjectIfNil :: a -> a | {}
 * 
 * Set array first element as empty object if empty.
 */
const emptyObjectIfNil: mixed => mixed | {} = R.ifElse(R.isNil, () => ({}), R.identity);

/**
 * joinContent :: [String] -> String
 * 
 * Join elements of the array but first one (metadata).
 * If there's only one element (no metadata), it returns it.
 */
const joinContent: Array<string> => string = R.ifElse(
  R.compose(R.lt(1), R.length),
  R.compose(R.join(JOIN_SEPARATOR), R.drop(1)),
  R.head
);

/**
 * splitSource :: String -> [Object, String]
 * 
 * Split a string with the METADATA_END separator if it starts with METADATA_START.
 * Otherwise it creates a singleton array containing the value provided.
 */
const splitSource: string => Array<string> = R.ifElse(R.test(METADATA_START), R.split(METADATA_END), R.of);

/**
 * createParseResult :: Object -> String -> {metadata: Object, content: String}
 * 
 * Given two values, it returns an object with values mapped as metadata and content respectively.
 */
const createParseResult = (metadata: Object) => (content: string): ParseResult => ({
  metadata,
  content
});

/**
 * parse :: YAMLParser -> String -> {metadata: a, content: b} | Error
 * 
 * Parse a markdown document (src) looking for metadata in YAML format.
 * In order to be parsed, metadata must be placed at the beginning of the document between two triple dashes.
 * Example:
 * ---
 * title: Lorem ipsum
 * author: Marcus Antonius
 * keywords: latin, ipsum
 * ---
 */
const parse = (yamlParser: { safeLoad: string => Object | Error }) => (src: string): ParseResult | Error => {
  // safeYamlParse :: String -> Result Object YAMLException
  const safeYamlParse = metadataString => Result.try(() => yamlParser.safeLoad(metadataString));

  // getMetadata :: String -> String | null
  const getMetadata = R.compose(cleanMetadata, splitSource);

  // getContentResult :: Result -> Result Object Error
  const getMetadataResult = R.compose(R.map(emptyObjectIfNil), R.chain(safeYamlParse), R.map(getMetadata));

  // getContentResult :: Result -> Result String Error
  const getContentResult = R.map(R.compose(joinContent, splitSource));

  const getParseResult = R.lift(createParseResult);
  const resultOfSrc = getResultOfString(src);

  return getParseResult(getMetadataResult(resultOfSrc), getContentResult(resultOfSrc)).merge();
};

export default parse;
