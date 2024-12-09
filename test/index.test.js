import { test } from 'node:test'
import assert from 'node:assert'
import metadataParser from '../lib/index.js'
import source from './fixtures/documents.js'

const parseDocument = (document) => {
  const { text, content, metadata } = document
  const result = metadataParser(text)
  assert.strictEqual(result.content, content)
  assert.deepStrictEqual(result.metadata, metadata)
}

test('it parses metadata in a syntactically correct markdown document', () => {
  parseDocument(source.document01)
})

test('it parses metadata in a syntactically correct markdown document with no content', () => {
  parseDocument(source.document02)
})

test('it returns no metadata in a document without the ending triple dashes', () => {
  parseDocument(source.document03)
})

test('it returns no metadata in a document without the opening triple dashes', () => {
  parseDocument(source.document04)
})

test('it returns no metadata in a document with empty metadata', () => {
  parseDocument(source.document05)
})

test('it returns no metadata in a document with metadata placed at the end', () => {
  parseDocument(source.document06)
})

test('it returns no metadata in a document without metadata', () => {
  parseDocument(source.document07)
})

test('it throws TypeError if markdown source text is not a string', () => {
  const parseNumber = () => metadataParser(123)
  assert.throws(parseNumber, new TypeError('Markdown source text must be a string.'))
})

test('it throws Error if metadata are syntactically incorrect', (t) => {
  const parseSyntacticallyIncorrectYAML = () => metadataParser(source.document08.text)
  assert.throws(parseSyntacticallyIncorrectYAML)
})
