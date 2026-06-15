'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { T3Page } from '@/types';

/**
 * Client-side wrapper for HeadlessDevTools.
 * Using { ssr: false } here is valid because this is a Client Component.
 */
const HeadlessDevTools = dynamic(
  () => import('@components/devtools/HeadlessDevTools'),
  { ssr: false }
);

interface DevToolsWrapperProps {
  pageData: T3Page;
}

export default function DevToolsWrapper({ pageData }: DevToolsWrapperProps) {
  if (process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS !== 'true') {
    return null;
  }
  return <HeadlessDevTools pageData={pageData} />;
}