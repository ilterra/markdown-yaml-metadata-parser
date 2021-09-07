import detectNewline from "detect-newline";
import yaml from "js-yaml";

interface MetaData {
  [key: string]: any;
}

/**
 * @typedef {Object} ParseResult
 * @property {string} content Markdown source text without metadata.
 * @property {Object} metadata Plain object of parsed metadata.
 */
interface ParseResult {
  content: string;
  metadata: string | MetaData;
}

/**
 * @param {string} text Markdown source text to parse.
 * @returns {ParseResult} ParseResult object.
 * @throws {TypeError} Markdown source text must be a string.
 * @throws {YAMLException} YAML parser function error.
 */
const metadataParser = (text: string): ParseResult => {
  let METADATA_START: RegExp;
  let METADATA_END: string | any[];
  let METADATA_FILE_END: string | any[];
  let result: ParseResult = {
    content: text,
    metadata: "",
  };

  const validateMarkdownText = () => {
    if (typeof text !== "string") {
      throw new TypeError("Markdown source text must be a string.");
    }
  };

  const setMetadataPatterns = () => {
    const newline = detectNewline.graceful(text);
    METADATA_START = new RegExp(`^---${newline}`);
    METADATA_END = `${newline}---${newline}`;
    METADATA_FILE_END = `${newline}---`;
  };

  const splitTextWithMetadata = () => {
    const metadataEndIndex = text.indexOf(METADATA_END as string);
    if (metadataEndIndex !== -1) {
      result = {
        content: text.substring(metadataEndIndex + METADATA_END.length),
        metadata: text.substring(0, metadataEndIndex),
      };
    }
  };

  const splitTextWithOnlyMetadata = () => {
    if (!result.metadata && text.endsWith(METADATA_FILE_END as string)) {
      result = {
        content: "",
        metadata: text.substring(0, text.length - METADATA_FILE_END.length),
      };
    }
  };

  const extractContentAndMetadata = () => {
    if (METADATA_START.test(text)) {
      splitTextWithMetadata();
      splitTextWithOnlyMetadata();
    }
  };

  const removeStartPatternFromMetadata = () => {
    result = {
      ...result,
      metadata: result.metadata
        ? result.metadata!.replace(METADATA_START, "").trim()
        : null,
    };
  };

  const parseMetadata = () => {
    const parseResult = result.metadata
      ? yaml.load(result.metadata as string)
      : {};
    result = {
      ...result,
      metadata: parseResult as MetaData,
    };
  };

  const parse = () => {
    validateMarkdownText();
    setMetadataPatterns();
    extractContentAndMetadata();
    removeStartPatternFromMetadata();
    parseMetadata();
  };

  parse();
  return result;
};

export default metadataParser;
