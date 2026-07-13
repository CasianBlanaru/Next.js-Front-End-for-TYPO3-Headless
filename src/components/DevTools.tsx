"use client";

import React, { useSyncExternalStore } from 'react';
import { DevToolsWrapper } from '@pixelcoda/headless-nextjs';
import { normalizeContentColumns } from '../lib/typo3';
import { Typo3Page } from '../types/typo3';

interface DevToolsProps {
  page: Typo3Page | any;
}

const subscribe = () => () => {};

export default function DevTools({ page }: DevToolsProps) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) return null;

  const pageData = page
    ? {
        ...page,
        content: normalizeContentColumns(page.content),
      }
    : page;

  return <DevToolsWrapper pageData={pageData} />;
}
