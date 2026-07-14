# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2026-07-13

### Changed
- **TypeScript Migration**: Converted the entire codebase from JavaScript/JSX to strict TypeScript.
- **Improved Architecture**: Refined the API client and renderer logic with explicit interfaces and JSDoc documentation.
- **Testing Infrastructure**: Introduced Vitest for unit/component testing and Playwright for E2E testing.
- **SEO & Performance**:
    - Implemented dynamic `sitemap.ts` and `robots.ts`.
    - Enhanced dynamic metadata (OpenGraph, Twitter cards).
    - Optimized bundle size with dynamic imports for heavy components (GSAP).
- **Standards**: Added `.editorconfig`, `.prettierrc.json`, `CODEOWNERS`, `SECURITY.md`, and `CODE_OF_CONDUCT.md`.
- **CI/CD**: Added GitHub Actions workflow for automated quality assurance.

### Added
- `docs/FAQ.md`: Frequently Asked Questions.
- `docs/MIGRATION_GUIDE.md`: Guide for upgrading from previous versions.
- `docs/CUSTOM_CTYPES.md`: Tutorial for extending the frontend with custom TYPO3 elements.
- `RENAMING_PROPOSAL.md`: Strategy for transitioning to the `pixelcoda-next-typo3` identity.

### Fixed
- Stabilized the production build process.
- Fixed resilient slug resolving and search faceting.
- Addressed environment-specific dependency mismatches in CI.
