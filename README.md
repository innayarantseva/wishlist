# Wishlist

A minimal static wishlist — plain HTML, CSS, and JavaScript, no frameworks. It is a small multi-page app (MPA) with cross-document view transitions between the list and each item.

## Running locally

Serve the project root with any static file server; there is no build step. For example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` and use `index.html` for the grid or open a detail URL such as `wish.html?id=your-wish-id`.

## Pages and scripts

| Page | Script | Role |
|------|--------|------|
| `index.html` | `main.js` | Renders all wishes in a grid and wires the category filter. |
| `wish.html?id=…` | `wish.js` | Shows one wish; if the `id` is missing or unknown, shows a short “not found” message. |

Custom elements live under `components/`:

- **`wish-card`** — One card on the list; links to `wish.html?id=…`, sets `view-transition-name` on the image and title for transitions.
- **`category-filter`** — Renders filter buttons from the unique categories in the data. The first option is "All" (show everything). Choosing a category dispatches a bubbling `filter` event with `detail.category` (or an empty string for choosing all items).

`main.js` listens for that event, toggles `hidden` on cards, and runs the update inside `document.startViewTransition` when the API exists.

`index.html` includes a **Speculation Rules** snippet to prerender linked wish pages (`moderate` eagerness for `.wish-card` links).

## Data

All items are exported from `data/wishes.js` as `WISHES`. Each wish is a plain object:

```js
{
  id: "unique-slug",
  name: "Item Name",
  description: "Why I want it.",
  url: "https://link-to-buy.example",
  image: "https://placehold.co/400x400/e8e8e8/555?text=Item",
  price: "$42",
  priority: "high",
  category: "tech",
}
```

- **id** — URL-safe slug, unique (also used in `view-transition-name` values).
- **url** — A purchase link; omitted when empty.
- **priority** — One of `high`, `medium`, or `low` (see `PRIORITY_TRANSLATIONS` for display text).
- **category** — Any string; filter buttons are built automatically from distinct values.

## Translations

`data/translations.js` holds user-facing labels:

- **`CATEGORIES_TRANSLATIONS`** — Map category keys to labels on the filter (e.g. Russian copy). Categories without an entry use the raw `category` string.
- **`PRIORITY_TRANSLATIONS`** — Map `high` / `medium` / `low` to the short labels shown on cards and on the detail page.

## Deployment

The static site is deployed to GitHub Pages, triggered by a push to `main`.
