# Developer Documentation: @pixelcoda/headless-nextjs

## What it does

`@pixelcoda/headless-nextjs` is a library designed to bridge the gap between TYPO3's Headless JSON output and Next.js applications. It provides the core primitives and tools needed to build a performant, SEO-optimized, and editable frontend.

## Key Concepts

### 1. The Renderer Workflow
The library expects a JSON response from TYPO3. It provides utilities to flatten this structure and prepares it for React rendering.
- **`T3Frame`**: A base component that handles common TYPO3 appearance settings like `frameClass`, `layout`, and spacing.
- **`DevToolsWrapper`**: A visual overlay that allows developers to inspect the raw JSON data associated with each component on the page.

### 2. Frontend Editing Communication
One of the most powerful features is the built-in support for TYPO3's Frontend Editing.
- It provides API routes that proxy requests to the TYPO3 backend.
- It manages backend sessions and authentication (cookies).
- It injects the necessary editor scripts and styles when a valid backend session is detected.

### 3. Communicating with TYPO3
The library communicates with TYPO3 via standard HTTP requests to the `ext:headless` endpoints. It typically targets:
- `type=0` (or default): Page content and metadata.
- `type=834`: Initial data (menus, site settings).
- `type=1701`: Search endpoints.

## Extending the Package

Developers can extend the functionality in several ways:

### Custom Component Mapping
In `src/components/Renderer.tsx`, you can define how specific TYPO3 `CType` values map to your React components.

```typescript
export const rendererComponents = {
  text: MyCustomTextComponent,
  my_extension_ctype: MyExtensionComponent,
};
```

### Custom Styling
The library provides minimal styling to ensure it fits into any design system. You can override the default CSS classes used by `T3Frame` and other components in your global CSS.

### Hooking into API Requests
You can wrap the `fetchPageData` and other utility functions in `src/lib/typo3.ts` to add custom headers, logging, or additional data transformation logic.

## Why it exists
Building a TYPO3 Headless frontend from scratch involves repeating a lot of boilerplate (slug resolving, menu handling, editor integration). This package centralizes that logic, allowing developers to focus on building unique UI components rather than infrastructure.
