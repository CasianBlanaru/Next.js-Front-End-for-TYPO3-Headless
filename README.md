# @pixelcoda/headless-nextjs

Production-ready Next.js App Router frontend framework for TYPO3 Headless.

Built on [TYPO3 Headless](https://github.com/TYPO3-Initiatives/headless) with full [PixelCoda Headless](https://pixelcoda.de) compatibility.

<<<<<<< HEAD
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
=======
[![CI](https://github.com/CasianBlanaru/Next.js-Front-End-for-TYPO3-Headless/actions/workflows/ci.yml/badge.svg)](https://github.com/CasianBlanaru/Next.js-Front-End-for-TYPO3-Headless/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/@pixelcoda/headless-nextjs)](https://www.npmjs.com/package/@pixelcoda/headless-nextjs)
>>>>>>> 60a14d9 (chore: prepare release v1.0.0-alpha.1 and sync changes)

---

## Installation

```bash
<<<<<<< HEAD
yarn add @pixelcoda/headless-nextjs
```

Peer dependencies:

```bash
yarn add next react react-dom
```
=======
npm install @pixelcoda/headless-nextjs
# or
yarn add @pixelcoda/headless-nextjs
```
>>>>>>> 60a14d9 (chore: prepare release v1.0.0-alpha.1 and sync changes)

---

## Quick Start

<<<<<<< HEAD
### 1. Create a Next.js project

```bash
yarn create next-app my-headless-site --typescript --app
cd my-headless-site
yarn add @pixelcoda/headless-nextjs
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and adjust values:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-typo3-api.example.com
NEXT_PUBLIC_TYPO3_BASE_URL=https://your-typo3-api.example.com
NEXT_PUBLIC_BASE_URL=https://your-frontend.example.com
NEXT_PUBLIC_SKIN=premium
NEXT_PUBLIC_HEADLESS_DEVTOOLS=true
```

### 3. Render TYPO3 content

```tsx
import { getPageBySlug, PageContent } from '@pixelcoda/headless-nextjs';

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join('/') ?? '/';
  const pageData = await getPageBySlug(slug);

  return <PageContent pageData={pageData} />;
}
```

### 4. Start development
=======
### 1. Clone and configure

```bash
git clone https://github.com/CasianBlanaru/Next.js-Front-End-for-TYPO3-Headless.git my-project
cd my-project
cp .env.example .env.local
yarn install
```

### 2. Set environment variables

```env
NEXT_PUBLIC_API_BASE_URL=https://your-typo3-api.example.com
NEXT_PUBLIC_BASE_URL=https://your-frontend.example.com
```

### 3. Start development
>>>>>>> 60a14d9 (chore: prepare release v1.0.0-alpha.1 and sync changes)

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).
<<<<<<< HEAD
=======

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | TYPO3 Headless API endpoint | ✅ |
| `NEXT_PUBLIC_TYPO3_BASE_URL` | TYPO3 backend origin (for media) | ✅ |
| `NEXT_PUBLIC_BASE_URL` | Frontend public URL | ✅ |
| `NEXT_PUBLIC_FRONTEND_FILE_API` | Fileadmin proxy path | `/headless/fileadmin` |
| `NEXT_PUBLIC_SKIN` | Active skin (`premium` or `default`) | `premium` |
| `NEXT_PUBLIC_HEADLESS_DEVTOOLS` | Enable DevTools (`true`/`false`) | `false` |
| `NEXT_PUBLIC_REVALIDATE_SECONDS` | ISR revalidation interval | `60` |
| `REVALIDATE_SECRET` | Token for on-demand revalidation | — |
| `DEFAULT_LOCALE` | Default locale | `en` |
| `LOCALES` | Comma-separated locales | `en` |

Copy `.env.example` for a complete template.
>>>>>>> 60a14d9 (chore: prepare release v1.0.0-alpha.1 and sync changes)

---

## TYPO3 Headless Integration

The framework fetches all content from the TYPO3 Headless JSON API and renders it using mapped React components.

### Content element mapping

| TYPO3 type | Component |
|---|---|
| `text` | `T3CeText` |
| `textpic` / `textmedia` | `T3CeTextpic` |
| `image` | `T3CeImage` |
| `html` | `T3CeHtml` |
| `table` | `T3CeTable` |
| `uploads` | `T3CeUploads` |
| `bullets` | `T3CeBullets` |
| `menu_pages` | `T3CeMenuPages` |
| `menu_subpages` | `T3CeMenuSubpages` |
| `news_list` | `T3CeNewsList` |
| `news_detail` | `T3CeNewsDetail` |

### Image URL resolution

Images are resolved in priority order:

1. `cropVariants.default.publicUrl`
2. `publicUrl`
3. `originalUrl`

All URLs pass through `normalizeFileUrl()` which applies the `NEXT_PUBLIC_FRONTEND_FILE_API` proxy prefix.

---

## PixelCoda Headless Compatibility

The framework is forward-compatible with `pixelcoda_headless` TYPO3 extension metadata without requiring it.

Supported metadata (auto-detected from page response):

| Field | Description |
|---|---|
| `layout.identifier` | Backend layout override |
| `container.columns` | Column definitions for ResponsiveContainer |
| `responsive` | Per-breakpoint grid settings |
| `order.mobile` | Column reorder for mobile |
| `spacing.gap` | Gap preset |
| `width` | Width preset |
| `preview` | Preview mode flag |
| `visibility` | Element visibility rules |

Missing metadata is handled gracefully with sensible defaults.
<<<<<<< HEAD

```ts
import { getPixelcodaMeta, getColumnElements } from '@pixelcoda/headless-nextjs';

const meta = getPixelcodaMeta(pageData);
const columns = getColumnElements(pageData, meta);
=======

---

## Premium Skin

Set `NEXT_PUBLIC_SKIN=premium` to activate the Premium Skin.

The skin system resolves components in order:

1. `src/skins/premium/` — premium override
2. `src/skins/default/` — fallback

If a component is not found in the premium skin, the default implementation is used automatically.

To add a premium override, register it in `src/registry/index.ts`:

```ts
import MyPremiumHero from './components/premium/PremiumHero';

const skinOverrides = {
  premium: {
    hero: MyPremiumHero,
  },
};
>>>>>>> 60a14d9 (chore: prepare release v1.0.0-alpha.1 and sync changes)
```

---

<<<<<<< HEAD
## Premium Skin

Set `NEXT_PUBLIC_SKIN=premium` to activate the Premium Skin.

The skin system resolves components in order:

1. `src/skins/premium/` — premium override
2. Default component map — automatic fallback

If a component is not found in the premium skin, the default implementation is used automatically.

Premium components:

- `PremiumLayout`
- `PremiumHero`
- `PremiumFeatureGrid`
- `PremiumNewsList`
- `PremiumCTA`

Register additional premium overrides in `src/registry/index.ts`:

```ts
const skinOverrides = {
  premium: {
    header: PremiumHero,
    news_list: PremiumNewsList,
  },
};
=======
## Headless DevTools

Enable with `NEXT_PUBLIC_HEADLESS_DEVTOOLS=true`.

Open with:
- `CMD + SHIFT + H` (macOS)
- `CTRL + SHIFT + H` (Windows / Linux)

Or click the **Headless DevTools** button (bottom-right corner).

| Panel | Description |
|---|---|
| Inspector | List all content elements. Click to inspect. |
| JSON | Raw JSON for the selected element or full page. |
| Layout | Backend layout, PixelCoda metadata, width, gap. |
| API | Page ID, slug, language entries, full page JSON. |
| Mapping | TYPO3 type → React component map and status. |

DevTools are disabled in production unless explicitly enabled.

---

## Responsive Container System

`ResponsiveContainer` renders TYPO3 content columns as a responsive CSS grid.

### Column presets

| Preset | Layout |
|---|---|
| `12` | 1 column |
| `6-6` | 2 equal columns |
| `4-4-4` | 3 equal columns |
| `3-3-3-3` | 4 equal columns |
| `8-4` / `4-8` | Asymmetric 2 columns |
| `9-3` / `3-9` | Sidebar layout |

### Breakpoints

`mobile` → `tablet` → `desktop`

### Width presets

`narrow` · `contained` · `wide` · `full`

### Gap presets

`none` · `xs` · `sm` · `md` · `lg` · `xl`

---

## Package Exports

Import from `@pixelcoda/headless-nextjs`:

```ts
import {
  // Components
  ResponsiveContainer,
  T3Renderer,
  PageContent,
  Typo3Image,
  MediaFile,
  T3Link,
  HeadlessDevTools,

  // Services
  t3Fetch,
  normalizeFileUrl,
  getPageBySlug,
  getPageMetadata,

  // PixelCoda
  getPixelcodaMeta,
  getColumnElements,
  getResponsiveGridClasses,

  // Config
  getActiveSkin,
  isPremiumSkin,

  // Registry
  getComponent,
  getLayoutComponent,

  // Types
} from '@pixelcoda/headless-nextjs';
>>>>>>> 60a14d9 (chore: prepare release v1.0.0-alpha.1 and sync changes)
```

---

<<<<<<< HEAD
## Headless DevTools

Enable with `NEXT_PUBLIC_HEADLESS_DEVTOOLS=true`.

Open with:

- `CMD + SHIFT + H` (macOS)
- `CTRL + SHIFT + H` (Windows / Linux)

Or click the **Headless DevTools** button in the bottom-right corner.

| Panel | Description |
|---|---|
| Inspector | List all content elements. Click to inspect. |
| JSON | Raw JSON for the selected element or full page. |
| Layout | Backend layout, PixelCoda metadata, width, gap. |
| API | Page ID, slug, language entries, full page JSON. |
| Mapping | TYPO3 type → React component map and status. |

DevTools are disabled in production unless explicitly enabled.

---

## Responsive Container System

`ResponsiveContainer` renders TYPO3 content columns as a responsive CSS grid.

### Column presets

| Preset | Layout |
|---|---|
| `12` | 1 column |
| `6-6` | 2 equal columns |
| `4-4-4` | 3 equal columns |
| `3-3-3-3` | 4 equal columns |
| `8-4` / `4-8` | Asymmetric 2 columns |
| `9-3` / `3-9` | Sidebar layout |

### Breakpoints

`mobile` → `tablet` → `desktop`

### Width presets

`narrow` · `contained` · `wide` · `full`

### Gap presets

`none` · `xs` · `sm` · `md` · `lg` · `xl`

```tsx
import { ResponsiveContainer } from '@pixelcoda/headless-nextjs';

<ResponsiveContainer
  columns={meta.container?.columns}
  responsive={meta.responsive}
  gap={meta.spacing?.gap}
  width={meta.width}
>
  {children}
</ResponsiveContainer>
```

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | TYPO3 Headless API endpoint | — |
| `NEXT_PUBLIC_TYPO3_BASE_URL` | TYPO3 backend origin (for media) | — |
| `NEXT_PUBLIC_BASE_URL` | Frontend public URL | — |
| `NEXT_PUBLIC_FRONTEND_FILE_API` | Fileadmin proxy path | `/headless/fileadmin` |
| `NEXT_PUBLIC_SKIN` | Active skin (`premium` or `default`) | `default` |
| `NEXT_PUBLIC_HEADLESS_DEVTOOLS` | Enable DevTools (`true`/`false`) | `false` in production |
| `NEXT_PUBLIC_REVALIDATE_SECONDS` | ISR revalidation interval | `60` |
| `REVALIDATE_SECRET` | Token for on-demand revalidation | — |
| `DEFAULT_LOCALE` | Default locale | `en` |
| `LOCALES` | Comma-separated locales | `en` |

---

## Package Exports

Import from `@pixelcoda/headless-nextjs`:

```ts
import {
  // Layout
  ResponsiveContainer,
  T3Renderer,
  PageContent,

  // Media
  Typo3Image,
  MediaFile,

  // DevTools
  HeadlessDevTools,
  DevToolsWrapper,
  isDevToolsEnabled,

  // Premium Skin
  PremiumHero,
  PremiumLayout,

  // Services
  t3Fetch,
  normalizeFileUrl,
  getPageBySlug,
  getPageMetadata,

  // PixelCoda
  getPixelcodaMeta,
  getColumnElements,
  getResponsiveGridClasses,

  // Registry
  getComponent,
  getLayoutComponent,
  componentMap,

  // Config
  getActiveSkin,
  isPremiumSkin,
} from '@pixelcoda/headless-nextjs';
```

Styles:

```ts
import '@pixelcoda/headless-nextjs/styles';
```

---

## Deployment

### Production build

```bash
yarn build:app
yarn start
```

### On-demand revalidation

```bash
=======
## Deployment

### Production build

```bash
yarn build
yarn start
```

### On-demand revalidation

```bash
>>>>>>> 60a14d9 (chore: prepare release v1.0.0-alpha.1 and sync changes)
curl -X POST "https://your-frontend.example.com/api/revalidate" \
  -H "Authorization: Bearer YOUR_REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"path": "/"}'
```

Revalidate by cache tag:

```bash
curl -X POST "https://your-frontend.example.com/api/revalidate" \
  -H "Authorization: Bearer YOUR_REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["typo3"]}'
```

---

## Validation

```bash
yarn lint
yarn typecheck
yarn test
yarn build
```

---

## License

MIT © [Casian Blanaru](https://github.com/CasianBlanaru)
