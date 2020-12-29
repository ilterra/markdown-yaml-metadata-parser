# Markdown YAML metadata parser

[![Build Status](https://travis-ci.org/ilterra/markdown-yaml-metadata-parser.svg?branch=master)](https://travis-ci.org/ilterra/markdown-yaml-metadata-parser)

Parse YAML metadata (front matter) in a markdown document.

This is a dual module, written in ESM (ECMAScript modules) and supporting CJS (CommonJS).

## Installation

Install the latest version via npm:

```bash
$ npm install markdown-yaml-metadata-parser
```

## Usage

In order to be parsed, metadata must be placed at the beginning of the markdown document between two triple dashes (YAML front matter). Example:

    ---
    title: Meditations
    author: Marcus Aurelius
    keywords: stoicism, book
    ---

    Vestibulum tortor quam, *feugiat vitae*, ultricies eget, tempor sit amet, ante.

Here's how to parse the metadata. Import (or require) the parser:

```js
import metadataParser from 'markdown-yaml-metadata-parser'
```

Assuming source is a string containing the markdown document, parse source:

```js
const source = '--- title: Meditations...'
const result = metadataParser(source)
```

`result` is a two-property object. The first property, `result.metadata`, is the object of parsed metadata:

```js
{
  'title': 'Meditations',
  'author': 'Marcus Aurelius',
  'keywords': 'stoicism, book'
}
```

The second property, `result.content`, is the document source without metadata:

```
Vestibulum tortor quam, *feugiat vitae*, ultricies eget, tempor sit amet, ante.
```

## License

Markdown YAML metadata parser is licensed under the MIT License. See the `LICENSE` file for details.