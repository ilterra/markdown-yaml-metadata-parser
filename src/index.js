// @flow
import yaml from 'js-yaml';
import parser from './parser';

const metadataParse = parser(yaml);

export default metadataParse;
