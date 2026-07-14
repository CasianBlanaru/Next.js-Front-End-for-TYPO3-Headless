# Frequently Asked Questions (FAQ)

## 1. How do I add a new Content Element Type (CType)?
Mapping a new CType involves two steps:
1. Create your React component in `src/components/`.
2. Add it to the `rendererComponents` mapping in `src/components/Renderer.tsx`.

## 2. Why am I seeing a "Rate Limited" error?
The API client includes a retry mechanism. If you still see this error, ensure your TYPO3 backend is not blocked by a firewall or WAF that limits requests from your Next.js server's IP.

## 3. How does Frontend Editing work?
Frontend editing relies on specific data attributes injected by the `ContentElement` or `EditableContent` components. When a backend user is logged in, the `FrontendEditor` component detects the session and initializes the TYPO3 editing interface.

## 4. Can I use this with TYPO3 12?
Yes, this project is designed to be compatible with TYPO3 12 and 13 LTS.

## 5. How do I change the theme?
The styling is managed via `src/app/globals.css`. We use standard CSS variables that you can override to match your brand.
