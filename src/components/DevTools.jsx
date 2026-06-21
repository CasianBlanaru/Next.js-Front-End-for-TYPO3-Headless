"use client";

import { useState, useEffect } from 'react';
import { DevToolsWrapper } from '@pixelcoda/headless-nextjs';
import { normalizeContentColumns } from '../lib/typo3';

export default function DevTools({ page }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const pageData = page
    ? {
        ...page,
        content: normalizeContentColumns(page.content),
      }
    : page;

  return <DevToolsWrapper pageData={pageData} />;
}
