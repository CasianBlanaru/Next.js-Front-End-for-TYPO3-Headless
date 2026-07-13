# Renaming Proposal: `pixelcoda-next-typo3`

This document outlines the proposed transition of the repository and package identity while maintaining backwards compatibility.

## Current Identity
- **Repository Name**: `Next.js-Front-End-for-TYPO3-Headless`
- **Package Name (in `package.json`)**: `pixelcoda-nextjs-frontend`
- **Current Version**: `0.1.0`

## Proposed Identity
- **New Repository Name**: `pixelcoda-next-typo3`
- **New Package Name**: `@pixelcoda/next-typo3` (to align with the namespace)
- **Alternative Package Name**: `pixelcoda-next-typo3`

## Affected Areas

### 1. Imports and Code
- Public imports from this package (if any are used as a library) would need to be updated.
- Internal absolute paths (if used via `baseUrl` or `paths` in `tsconfig.json`) are currently using `@/*`, so they are **not affected**.

### 2. URLs and Integration
- GitHub repository URL will change (redirects usually handled by GitHub).
- CI/CD badges in `README.md` will need update.
- Deployment hooks (Vercel/Railway) might need reconfiguration if they rely on the repository name.

### 3. Documentation
- All mentions of the old name in `README.md`, `PACKAGE_DOCS.md`, and other docs will be updated.

## Backwards Compatibility Strategy

### Package Name
To maintain compatibility with existing `package.json` references:
- We will keep the `name` in `package.json` as is for the current branch, OR
- If we change it, we can provide a compatibility entry in documentation for users migrating.
- **Decision**: Per user instructions, existing package names and public imports **must remain backwards-compatible**. We will keep the `name` field in `package.json` as `pixelcoda-nextjs-frontend` for now, or use a "provide" alias if supported by the registry.

### Repository Name
The GitHub repository name can be changed; GitHub automatically provides redirects for git clones and web traffic.

## Possible Breaking Changes
- None identified for the code itself, as it's a standalone frontend.
- Potential breakage for external tools or scripts that hardcode the GitHub repository path.

## Summary of Changes required for Renaming
1. Rename GitHub repository (outside of Jules' control).
2. Update `README.md` badges and text.
3. Update `package.json` `repository` field.
4. Update `next.config.js` or `.env` if they reference the repo name.
