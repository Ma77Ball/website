# Writing posts

Every file in this folder that ends in `.md` becomes a post on the **Thoughts**
page. To publish a new one, copy an existing file, rename it, and edit it. The
file name becomes the URL, so `my-new-post.md` is served at `/thoughts/my-new-post`.

Each post starts with a small frontmatter block between `---` lines:

```markdown
---
title: "The title shown on the card and the post page"
date: "2026-09-25"          # ISO date. Omit or leave "" to show "Coming soon".
tag: "LLMs"                  # short label shown on the card
excerpt: "One or two sentences shown on the card."
cover: 0                     # optional: 0, 1, or 2 picks the card gradient
draft: false                # optional: true hides it from the site
---

Write the post body here in normal **markdown** - headings, lists,
`code`, [links](https://example.com), quotes, and so on.
```

Notes:
- Posts are sorted newest first by `date`; undated posts sort to the end.
- `draft: true` keeps a post out of the list and off the site entirely.
- `README.md` and any file starting with `_` are ignored, so they never
  show up as posts.
