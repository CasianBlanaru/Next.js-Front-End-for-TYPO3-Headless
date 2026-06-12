# NextWTL Headless for TYPO3

This solution is based on the following TYPO3 initiatives:

-   [TYPO3 Headless](https://github.com/TYPO3-Headless/headless)
-   [TYPO3 Headless News](https://github.com/TYPO3-Headless/headless_news)

## Prerequisites

Make sure you have [DDEV](https://ddev.readthedocs.io/en/stable/) version `v1.12.7` or newer installed.

We recommend Unix-based operating systems like Linux or macOS, as issues have been encountered with WSL2 usage.

## Installation

2. Start the DDEV Docker containers:

```bash
ddev start
```

3. To start the Next.js frontend application, run the following command:

```bash
ddev exec "cd front && yarn dev"
```

You can now access the application in your browser at the following links:

| Application   | URL                                  | Credentials      |
| ------------- | ------------------------------------ | ---------------- |
| Frontend      | https://next-typo3.ddev.site          |                  |
| TYPO3 Backend | https://api.next-typo3/typo3 | `admin:password` |

## Frontend Development with Next.js

Start the Next.js application in development mode with:

```bash
ddev exec "cd front && yarn dev"
```

## Update Database

Occasionally, the database for the `pwa-next` project is updated. If you want to update your local database, run the following command in the project root directory:

```bash
ddev import-db --file ./data/db.sql.gz
```

### Configuration

-   Create `.env.local` with the backend URL and other required environment variables.

📦 pwa-next
├── 📂 backend - Contains the TYPO3 backend
│ ├── 📂 packages - Configuration files for TYPO3
│      └── 📂 site-package - Uploaded files
├── 📂 frontend - Next.js frontend application
│ ├── 📂 components - Reusable components
│ ├── 📂 pages - Application pages and routes
│ ├── 📂 hooks - React hooks for logic management
│ └── 📂 styles - Tailwind CSS/SCSS styling
├── 📂 data - Database and SQL files
├── 📂 docker - Docker configurations for DDEV
└── 📂 config - DDEV-specific configuration files

## PixelCoda Headless integration

This frontend includes first-class preparation for `EXT:pixelcoda_headless`.

Supported metadata:

- `layout.identifier`
- `container.columns[]`
- `responsive.desktop/tablet/mobile.grid`
- `order.desktop/tablet/mobile`
- `spacing.gap`
- `width`
- `preview`
- `devtools`

Example response fragment:

```json
{
  "layout": { "identifier": "two-column" },
  "container": {
    "identifier": "three-column",
    "columns": [
      { "name": "left", "colPos": 200 },
      { "name": "center", "colPos": 201 },
      { "name": "right", "colPos": 202 }
    ]
  },
  "responsive": {
    "desktop": { "grid": "4-4-4" },
    "tablet": { "grid": "6-6" },
    "mobile": { "grid": "12" }
  },
  "spacing": { "gap": "lg" },
  "width": "contained"
}
```

## Headless DevTools

The built-in inspector is available in development. Toggle it with:

```txt
CMD + SHIFT + H
CTRL + SHIFT + H
```

Disable it explicitly with:

```env
NEXT_PUBLIC_HEADLESS_DEVTOOLS=false
```

Included panels:

- Inspector
- JSON
- Layout
- API
- Mapping

The page renderer annotates TYPO3 content elements with `data-t3-*` attributes, so developers can inspect UID, type, colPos and renderer mapping directly in the browser.
