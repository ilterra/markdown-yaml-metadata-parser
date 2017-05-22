import {
  document01,
  metadata01,
  document02,
  document03,
  document04,
  document05,
  document06,
  document07
} from './__fixtures__/documents';
import parser from '../src/parser';

/**
 * Mock js-yaml.
 * safeLoad: return empty object by default.
 */
let yamlParser;

beforeAll(() => {
  yamlParser = {
    safeLoad: jest.fn().mockImplementation(() => ({}))
  };
});

it('parses metadata in a syntactically correct markdown document', () => {
  yamlParser.safeLoad.mockImplementationOnce(() => metadata01);
  expect(parser(yamlParser)(document01)).toMatchSnapshot();
});

it('returns no metadata in a document without the ending triple dashes', () => {
  expect(parser(yamlParser)(document02)).toMatchSnapshot();
});

it('returns no metadata in a document without the opening triple dashes', () => {
  expect(parser(yamlParser)(document03)).toMatchSnapshot();
});

it('returns no metadata in a document with empty metadata', () => {
  expect(parser(yamlParser)(document04)).toMatchSnapshot();
});

it('returns no metadata in a document with metadata placed at the end', () => {
  expect(parser(yamlParser)(document05)).toMatchSnapshot();
});

it('returns no metadata in a document without metadata', () => {
  expect(parser(yamlParser)(document06)).toMatchSnapshot();
});

it("returns TypeError if it doesn't receive a String", () => {
  const parseResult = parser(yamlParser)(123);
  expect(parseResult instanceof TypeError).toBeTruthy();
  expect(parseResult.message).toMatchSnapshot();
});

it('returns Error if metadata are syntactically incorrect', () => {
  yamlParser.safeLoad.mockImplementationOnce(() => {
    throw new Error();
  });
  const parseResult = parser(yamlParser)(document07);
  expect(parseResult instanceof Error).toBeTruthy();
});
