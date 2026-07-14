# Migration Guide

## Upgrading to TypeScript
If you are coming from an older version of this project (JavaScript-only), follow these steps:
1. Replace your `src/` folder with the new TypeScript version.
2. Update your `package.json` dependencies (Next.js 15+, React 19, TypeScript 5+).
3. Ensure you have a valid `tsconfig.json`.

## Changing API endpoints
If your TYPO3 instance moves:
1. Update `NEXT_PUBLIC_TYPO3_BASE_URL` in your environment variables.
2. Clear the Next.js build cache.

## Custom Components
Your custom components might need prop typing. Use the `Typo3ContentElement` interface provided in `src/types/typo3.ts` to ensure type safety.
