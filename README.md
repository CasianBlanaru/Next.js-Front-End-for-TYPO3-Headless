# PixelCoda Next.js Frontend for TYPO3 Headless

Standalone Next.js frontend for TYPO3 Headless.

## Structure

```txt
frontend/
├── package.json
├── next.config.js
├── railway.json
├── .env.example
└── src/
    ├── app/
    ├── components/
    └── lib/
```

## Install

```bash
yarn install
```

## Local env

Copy `.env.example` to `.env.local` and adjust the TYPO3 URL:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.typo3-inst.localhost
NEXT_PUBLIC_TYPO3_BASE_URL=https://api.typo3-inst.localhost
NEXT_PUBLIC_BASE_URL=https://typo3-inst.localhost
NEXT_PUBLIC_FRONTEND_FILE_API=/headless/fileadmin
NEXT_PUBLIC_SKIN=premium
NEXT_PUBLIC_HEADLESS_DEVTOOLS=true
```

## Development

```bash
yarn dev
```

## Production

```bash
yarn build
yarn start
```

## DevTools

If `NEXT_PUBLIC_HEADLESS_DEVTOOLS=true`, open the overlay with:

```txt
CMD + SHIFT + H
CTRL + SHIFT + H
```

## TYPO3 requirement

TYPO3 must have `TYPO3-Headless/headless` installed and must return JSON at the configured `NEXT_PUBLIC_API_BASE_URL`.
