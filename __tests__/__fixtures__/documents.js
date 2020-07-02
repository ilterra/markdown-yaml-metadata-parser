/**
 * Sample markdown sources.
 * For a more readable version, please look at the actual markdown documents.
 */
const document01 = {
  text: `---
title: Lorem ipsum dolor sit amet, consectetur adipiscing
author: Marcus Antonius
keywords: latin, ipsum
---

Correct markdown document. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
---
Correct markdown document. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.

Correct markdown document. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  content: `
Correct markdown document. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
---
Correct markdown document. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.

Correct markdown document. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  metadata: {
    author: 'Marcus Antonius',
    keywords: 'latin, ipsum',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing'
  }
}

const document02 = {
  text: `---
title: Lorem ipsum dolor sit amet, consectetur adipiscing
author: Marcus Antonius
keywords: latin, ipsum
---`,
  content: '',
  metadata: {
    author: 'Marcus Antonius',
    keywords: 'latin, ipsum',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing'
  }
}

const document03 = {
  text: `---
title: Lorem ipsum dolor sit amet, consectetur adipiscing
author: Marcus Antonius
keywords: latin, ipsum

No metadata end. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  content: `---
title: Lorem ipsum dolor sit amet, consectetur adipiscing
author: Marcus Antonius
keywords: latin, ipsum

No metadata end. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  metadata: {}
}

const document04 = {
  text: `title: Lorem ipsum dolor sit amet, consectetur adipiscing
author: Marcus Antonius
keywords: latin, ipsum
---

No metadata start. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  content: `title: Lorem ipsum dolor sit amet, consectetur adipiscing
author: Marcus Antonius
keywords: latin, ipsum
---

No metadata start. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  metadata: {}
}

const document05 = {
  text: `---

---

Empty metadata. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  content: `
Empty metadata. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  metadata: {}
}

const document06 = {
  text: `Metadata not at the beginning of the document. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.

---
title: The murder of our hopes and dreams
author: Master John
keywords: comedy, movie
---`,
  content: `Metadata not at the beginning of the document. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.

---
title: The murder of our hopes and dreams
author: Master John
keywords: comedy, movie
---`,
  metadata: {}
}

const document07 = {
  text: `# Document with no metadata

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  content: `# Document with no metadata

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  metadata: {}
}

const document08 = {
  text: `---
deliberate yaml syntax error
author: Marcus Antonius
keywords: latin, ipsum
---

Metadata with YAML syntax error. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`
}

module.exports = {
  document01,
  document02,
  document03,
  document04,
  document05,
  document06,
  document07,
  document08
}
