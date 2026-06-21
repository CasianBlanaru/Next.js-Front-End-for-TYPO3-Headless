"use client";

import { DevToolsWrapper } from '@pixelcoda/headless-nextjs';
import { normalizeContentColumns } from '../lib/typo3';

export default function DevTools({ page }) {
  const pageData = page
    ? {
        ...page,
        content: normalizeContentColumns(page.content),
      }
    : page;

  return <DevToolsWrapper pageData={pageData} />;
}
