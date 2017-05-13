/**
 * Sample markdown sources.
 * For a more readable version, please look at the actual markdown documents.
 */
const document01 = `---
title: Lorem ipsum dolor sit amet, consectetur adipiscing
author: Marcus Antonius
keywords: latin, ipsum
---

Correct markdown document. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`;

const metadata01 = {
  author: 'Marcus Antonius',
  keywords: 'latin, ipsum',
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing'
};

const document02 = `---
title: Lorem ipsum dolor sit amet, consectetur adipiscing
author: Marcus Antonius
keywords: latin, ipsum

No metadata end. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`;

const document03 = `title: Lorem ipsum dolor sit amet, consectetur adipiscing
author: Marcus Antonius
keywords: latin, ipsum
---

No metadata start. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`;

const document04 = `---

---

Empty metadata. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`;

const document05 = `Metadata not at the beginning of the document. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.

---
title: The murder of our hopes and dreams
author: Master John
keywords: comedy, movie
---`;

const document06 = `# Document with no metadata

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`;

const document07 = `---
deliberate yaml syntax error
author: Marcus Antonius
keywords: latin, ipsum
---

Metadata with YAML syntax error. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`;

export { document01, metadata01, document02, document03, document04, document05, document06, document07 };
