'use strict'
/* eslint-env jest */
const detectNewline = require('detect-newline')
const yaml = require('js-yaml')
const parser = require('../lib/parser')
const source = require('./__fixtures__/documents')

let metadataParser
beforeAll(() => {
  metadataParser = parser({
    detectNewline,
    parseYaml: yaml.safeLoad
  })
})

const parseDocument = (document) => {
  const { text, content, metadata } = document
  const result = metadataParser(text)
  expect(result.content).toBe(content)
  expect(result.metadata).toStrictEqual(metadata)
}

it('parses metadata in a syntactically correct markdown document', () => {
  parseDocument(source.document01)
})

it('parses metadata in a syntactically correct markdown document with no content', () => {
  parseDocument(source.document02)
})

it('returns no metadata in a document without the ending triple dashes', () => {
  parseDocument(source.document03)
})

it('returns no metadata in a document without the opening triple dashes', () => {
  parseDocument(source.document04)
})

it('returns no metadata in a document with empty metadata', () => {
  parseDocument(source.document05)
})

it('returns no metadata in a document with metadata placed at the end', () => {
  parseDocument(source.document06)
})

it('returns no metadata in a document without metadata', () => {
  parseDocument(source.document07)
})

it('throws TypeError if markdown source text is not a string', () => {
  const parseNumber = () => metadataParser(123)
  expect(parseNumber).toThrowError(
    TypeError('Markdown source text must be a string.')
  )
})

it('throws Error if metadata are syntactically incorrect', () => {
  const parseSyntacticallyIncorrectYAML = () => metadataParser(source.document08.text)
  expect(parseSyntacticallyIncorrectYAML).toThrow()
})
