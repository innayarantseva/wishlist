# Wishlist

A minimal static wishlist — pure HTML, CSS, and JS with no frameworks. Built as an MPA with cross-document view transitions.

## Running locally

Just open `index.html` in your browser — no server required.

## Editing your wishlist

All items live in `data/wishes.js`. Each wish is a plain object:

```js
{
  id: "unique-slug",
  name: "Item Name",
  description: "Why you want it.",
  url: "https://link-to-buy.example",
  image: "https://placehold.co/400x400/e8e8e8/555?text=Item",
  price: "$42",
  priority: "high",
  category: "tech",
}
```

- **id** — URL-safe slug, must be unique (also used in `view-transition-name`)
- **url** — leave as `""` if there's no purchase link
- **priority** — `high`, `medium`, or `low`
- **category** — any string; filter buttons are generated automatically

## Deploying to GitHub Pages

Push to a repo, then enable Pages from **Settings → Pages → Source: Deploy from a branch** (pick `main` / root).

## Architecture

This is a true **multi-page app** — each view is its own HTML document:

| File | Purpose |
|---|---|
| `index.html` | List page — cards are static HTML, filtering is a small inline script |
| `wish.html` | Detail page — structure in HTML, populated by JS from the shared data |
| `data/wishes.js` | Wishlist data (descriptions, URLs) used by the detail page |
| `detail.js` | Reads `?id=` param and fills in the detail page |

The list page is almost entirely HTML — no external JS. The only script is ~10 lines for category filtering.

## Notable APIs used

- **Cross-document View Transitions** (`@view-transition { navigation: auto }`) — shared-element morph between list and detail pages, no JS orchestration needed
- **Speculation Rules** (`<script type="speculationrules">`) — pre-renders detail pages on hover for near-instant navigation
- **CSS nesting & `light-dark()`** — modern CSS, no preprocessor
- **`color-scheme: light dark`** — automatic OS-based theming
