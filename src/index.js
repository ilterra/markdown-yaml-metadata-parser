// @flow

import yaml from 'js-yaml';
import parser from './parser';

/**
 * Flow type aliases
 */
type ParseResult = {
  metadata: Object,
  content: string,
};

/**
 * Parse a markdown document looking for metadata in YAML format.
 * In order to be parsed, metadata must be placed at the beginning of the document between two triple dashes.
 * Example:
 * ---
 * title: Lorem ipsum
 * author: Marcus Antonius
 * keywords: latin, ipsum
 * ---
 *
 * @param {String} src The string to be parsed.
 * @throws {TypeError} Argument src must be a String.
 * @throws {YAMLException} On YAML parsing error.
 * @returns {Object} Two-property object: 'metadata': object of parsed metadata, 'content': document source without metadata
 */
const metadataParse = (src: string): ParseResult => parser(yaml, src);

export default metadataParse;
