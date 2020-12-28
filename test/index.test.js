import t from 'tap'
import metadataParser from '../esm/index.js'
import source from './fixtures/documents.js'

const parseDocument = (t, document) => {
  const { text, content, metadata } = document
  const result = metadataParser(text)
  t.equal(result.content, content)
  t.strictSame(result.metadata, metadata)
  t.end()
}

t.test('it parses metadata in a syntactically correct markdown document', (t) => {
  parseDocument(t, source.document01)
})

t.test('it parses metadata in a syntactically correct markdown document with no content', (t) => {
  parseDocument(t, source.document02)
})

t.test('it returns no metadata in a document without the ending triple dashes', (t) => {
  parseDocument(t, source.document03)
})

t.test('it returns no metadata in a document without the opening triple dashes', (t) => {
  parseDocument(t, source.document04)
})

t.test('it returns no metadata in a document with empty metadata', (t) => {
  parseDocument(t, source.document05)
})

t.test('it returns no metadata in a document with metadata placed at the end', (t) => {
  parseDocument(t, source.document06)
})

t.test('it returns no metadata in a document without metadata', (t) => {
  parseDocument(t, source.document07)
})

t.test('it throws TypeError if markdown source text is not a string', (t) => {
  const parseNumber = () => metadataParser(123)
  t.throws(parseNumber, new TypeError('Markdown source text must be a string.'))
  t.end()
})

t.test('it throws Error if metadata are syntactically incorrect', (t) => {
  const parseSyntacticallyIncorrectYAML = () => metadataParser(source.document08.text)
  t.throws(parseSyntacticallyIncorrectYAML)
  t.end()
})
