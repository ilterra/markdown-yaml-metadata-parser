import { document01, document02, document03, document04, document05, document06, document07 } from './__fixtures__/documents'
import metadataParser from '../src/parser';

it('parses metadata in a syntactically correct markdown document', () => {
  expect(metadataParser(document01)).toMatchSnapshot();
});

it('returns no metadata in a document without the ending triple dashes', () => {
  expect(metadataParser(document02)).toMatchSnapshot();
});

it('returns no metadata in a document without the opening triple dashes', () => {
  expect(metadataParser(document03)).toMatchSnapshot();
});

it('returns no metadata in a document with empty metadata', () => {
  expect(metadataParser(document04)).toMatchSnapshot();
});

it('returns no metadata in a document with metadata placed at the end', () => {
  expect(metadataParser(document05)).toMatchSnapshot();
});

it('returns no metadata in a document without metadata', () => {
  expect(metadataParser(document06)).toMatchSnapshot();
});

it('throws TypeError if it doesn\'t receive a String', () => {
  expect(() => {
    metadataParser(123);
  }).toThrowError(TypeError);
});

it('throws if metadata are syntactically incorrect', () => {
  expect(() => {
    metadataParser(document07);
  }).toThrow();
});
