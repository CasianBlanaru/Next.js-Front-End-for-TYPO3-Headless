# Next.js Front-End for TYPO3 Headless

Production-ready headless front-end built on Next.js App Router with TYPO3 Headless and PixelCoda Headless foundations.

---

## Quick Start

### Prerequisites

- [DDEV](https://ddev.readthedocs.io/) installed
- Node.js 20+
- Yarn 1.x

### Installation

```bash
ddev start
cp front/.env.example front/.env.local
ddev exec "cd front && yarn install"
```

Import the database dump if available:

```bash
ddev import-db --file ./data/db.sql.gz
```

### Development

```bash
ddev exec "cd front && yarn dev"
```

### Production Build

```bash
ddev exec "cd front && yarn build"
ddev exec "cd front && yarn start"
```

---

## Environment Variables

Copy `front/.env.example` to `front/.env.local` and adjust values.

| Variable | Description | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | TYPO3 Headless API endpoint | `https://api.nextjs-demo.ddev.site` |
| `NEXT_PUBLIC_TYPO3_BASE_URL` | TYPO3 backend origin | `https://api.nextjs-demo.ddev.site` |
| `NEXT_PUBLIC_BASE_URL` | Frontend public URL | `https://nextjs-demo.ddev.site` |
| `NEXT_PUBLIC_FRONTEND_FILE_API` | Fileadmin proxy path | `/headless/fileadmin` |
| `NEXT_PUBLIC_SKIN` | Active skin (`premium` or `default`) | `premium` |
| `NEXT_PUBLIC_HEADLESS_DEVTOOLS` | Enable DevTools overlay (`true`/`false`) | `true` |
| `NEXT_PUBLIC_REVALIDATE_SECONDS` | ISR revalidation interval | `60` |
| `REVALIDATE_SECRET` | Token for on-demand revalidation | `change-me` |
| `DEFAULT_LOCALE` | Default locale | `en` |
| `LOCALES` | Comma-separated locales | `en,de,pl` |

---

## Validation

```bash
ddev exec "cd front && yarn lint"
ddev exec "cd front && yarn typecheck"
ddev exec "cd front && yarn test"
ddev exec "cd front && yarn build"
```

Optional browser tests (requires Playwright):

```bash
ddev exec "cd front && npx playwright install --with-deps"
ddev exec "cd front && yarn e2e"
```

---

## Premium Skin

The multi-skin system is configured via `NEXT_PUBLIC_SKIN`.

- `premium` — production skin with enhanced components
- `default` — baseline skin

When `NEXT_PUBLIC_SKIN=premium`, the system resolves components from `src/skins/premium/`. If a component is not found there, it automatically falls back to `src/skins/default/`.

Premium components:

- `PremiumLayout`
- `PremiumHero`
- `PremiumFeatureGrid`
- `PremiumNewsList`
- `PremiumCTA`

---

## Headless DevTools

Activate with:

- `CMD + SHIFT + H` (macOS)
- `CTRL + SHIFT + H` (Windows / Linux)

Or click the **Headless DevTools** button in the bottom-right corner.

Panels:

| Panel | Description |
| --- | --- |
| Inspector | List all TYPO3 content elements on the page. Click to inspect. |
| JSON | Raw JSON for the selected element or full page response. |
| Layout | Backend layout, PixelCoda layout metadata, width, and gap. |
| API | Page ID, slug, language entries, and full page JSON. |
| Mapping | TYPO3 content type → React component mapping and status. |

DevTools are controlled by `NEXT_PUBLIC_HEADLESS_DEVTOOLS=true`. They can be enabled in any environment, including production.

---

## Responsive Container System

The `ResponsiveContainer` component supports flexible grid layouts driven by PixelCoda metadata.

Supported column presets:

| Preset | Columns |
| --- | --- |
| `12` | 1 column (full width) |
| `6-6` | 2 columns |
| `4-4-4` | 3 columns |
| `3-3-3-3` | 4 columns |
| `8-4` / `4-8` | 2 columns (asymmetric) |
| `9-3` / `3-9` | 2 columns (sidebar) |

Breakpoints: `mobile`, `tablet`, `desktop`.

Width presets: `narrow`, `contained`, `wide`, `full`.

Gap presets: `none`, `xs`, `sm`, `md`, `lg`, `xl`.

---

## TYPO3 Headless Integration

TYPO3 content elements are fetched from the Headless API and rendered by mapped React components.

| TYPO3 type | Component |
| --- | --- |
| `text` | `T3CeText` |
| `textpic` / `textmedia` | `T3CeTextpic` |
| `image` | `T3CeImage` |
| `html` | `T3CeHtml` |
| `table` | `T3CeTable` |
| `uploads` | `T3CeUploads` |
| `bullets` | `T3CeBullets` |
| `shortcut` | `T3CeShortcut` |
| `menu_pages` | `T3CeMenuPages` |
| `menu_subpages` | `T3CeMenuSubpages` |
| `menu_sitemap_pages` | `T3CeMenuSitemapPages` |
| `news_list` | `T3CeNewsList` |
| `news_detail` | `T3CeNewsDetail` |

### Image URL resolution

Images are resolved in priority order:

1. `cropVariants.default.publicUrl`
2. `publicUrl`
3. `originalUrl`

All URLs are normalized through `src/services/media.ts` using `NEXT_PUBLIC_TYPO3_BASE_URL` and `NEXT_PUBLIC_FRONTEND_FILE_API`.

---

## PixelCoda Headless Compatibility

The project is forward-compatible with `pixelcoda_headless` TYPO3 extension metadata without requiring it.

Supported metadata fields (auto-detected from page response):

| Field | Description |
| --- | --- |
| `layout.identifier` | Backend layout override |
| `container.columns` | Column definitions for ResponsiveContainer |
| `responsive` | Per-breakpoint grid settings |
| `order.mobile` | Column reorder for mobile |
| `spacing.gap` | Gap preset |
| `width` | Width preset |
| `preview` | Preview mode flag |
| `visibility` | Element visibility rules |

---

## On-Demand Revalidation

With `REVALIDATE_SECRET` set, trigger revalidation:

```bash
# Revalidate a path
curl -X POST "https://nextjs-demo.ddev.site/api/revalidate" \
  -H "Authorization: Bearer change-me" \
  -H "Content-Type: application/json" \
  -d '{"path":"/"}'

# Revalidate by cache tag
curl -X POST "https://nextjs-demo.ddev.site/api/revalidate" \
  -H "Authorization: Bearer change-me" \
  -H "Content-Type: application/json" \
  -d '{"tags":["typo3"]}'
```

---

## Troubleshooting

**`ERR_CONNECTION_RESET`**

```bash
ddev restart
ddev exec "cd front && yarn dev"
```

**`ddev import-db` fails**

Check if the dump exists:

```bash
ls -lah ./data/db.sql.gz
```

If missing, skip the import. It is not required to run the front-end.

**Build fails after moving files**

```bash
ddev exec "cd front && rm -rf .next && yarn build"
```

---

## License

MIT
