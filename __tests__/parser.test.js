const fs = require('fs');
const path = require('path');
const metadataParser = require('../lib/parser');

const $source01 = fs.readFileSync(path.join(__dirname, 'fixtures', 'document-01.markdown'), 'utf-8');
const $source02 = fs.readFileSync(path.join(__dirname, 'fixtures', 'document-02.markdown'), 'utf-8');
const $source03 = fs.readFileSync(path.join(__dirname, 'fixtures', 'document-03.markdown'), 'utf-8');
const $source04 = fs.readFileSync(path.join(__dirname, 'fixtures', 'document-04.markdown'), 'utf-8');
const $source05 = fs.readFileSync(path.join(__dirname, 'fixtures', 'document-05.markdown'), 'utf-8');
const $source06 = fs.readFileSync(path.join(__dirname, 'fixtures', 'document-06.markdown'), 'utf-8');
const $source07 = fs.readFileSync(path.join(__dirname, 'fixtures', 'document-07.markdown'), 'utf-8');

it('parses metadata in a syntactically correct markdown document', () => {
  expect(metadataParser($source01)).toMatchSnapshot();
});

it('returns no metadata in a document without the ending triple dashes', () => {
  expect(metadataParser($source02)).toMatchSnapshot();
});

it('returns no metadata in a document without the opening triple dashes', () => {
  expect(metadataParser($source03)).toMatchSnapshot();
});

it('returns no metadata in a document with empty metadata', () => {
  expect(metadataParser($source04)).toMatchSnapshot();
});

it('returns no metadata in a document with metadata placed at the end', () => {
  expect(metadataParser($source05)).toMatchSnapshot();
});

it('returns no metadata in a document without metadata', () => {
  expect(metadataParser($source06)).toMatchSnapshot();
});

it('throws TypeError if it doesn\'t receive a String', () => {
  expect(() => {
    metadataParser(123);
  }).toThrowError(TypeError);
});

it('throws if metadata are syntactically incorrect', () => {
  expect(() => {
    metadataParser($source07);
  }).toThrow();
});
