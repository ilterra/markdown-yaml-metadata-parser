/**
 * Sample markdown sources.
 * For a more readable version, please look at the actual markdown documents.
 */
const document01 = {
  text: `---
title: Meditations
author: Marcus Aurelius
keywords: stoicism, book
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
    author: 'Marcus Aurelius',
    keywords: 'stoicism, book',
    title: 'Meditations'
  }
}

const document02 = {
  text: `---
title: Meditations
author: Marcus Aurelius
keywords: stoicism, book
---`,
  content: '',
  metadata: {
    author: 'Marcus Aurelius',
    keywords: 'stoicism, book',
    title: 'Meditations'
  }
}

const document03 = {
  text: `---
title: Meditations
author: Marcus Aurelius
keywords: stoicism, book

No metadata end. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  content: `---
title: Meditations
author: Marcus Aurelius
keywords: stoicism, book

No metadata end. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  metadata: {}
}

const document04 = {
  text: `title: Meditations
author: Marcus Aurelius
keywords: stoicism, book
---

No metadata start. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  content: `title: Meditations
author: Marcus Aurelius
keywords: stoicism, book
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
title: Meditations
author: Marcus Aurelius
keywords: stoicism, book
---`,
  content: `Metadata not at the beginning of the document. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.

---
title: Meditations
author: Marcus Aurelius
keywords: stoicism, book
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
author: Marcus Aurelius
keywords: stoicism, book
---

Metadata with YAML syntax error. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`
}

export default {
  document01,
  document02,
  document03,
  document04,
  document05,
  document06,
  document07,
  document08
}
