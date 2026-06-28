"use client";

import { useEffect } from 'react';
import { siteConfig } from '../lib/config';

/**
 * Frontend Editor Integration Component
 * Loads TYPO3 Frontend Editing assets when a backend user is authenticated
 */
export default function FrontendEditor() {
  useEffect(() => {
    // Check if we're in the browser and if there's an authenticated backend user
    if (typeof window === 'undefined') return;

    const typo3BaseUrl = siteConfig.typo3BaseUrl.replace(/\/$/, '');
    
    // Load editor CSS
    const editorCss = document.createElement('link');
    editorCss.rel = 'stylesheet';
    editorCss.href = `${typo3BaseUrl}/typo3conf/ext/pixelcoda_fe_editor/Resources/Public/editor.css`;
    document.head.appendChild(editorCss);

    // Load editor JS
    const editorJs = document.createElement('script');
    editorJs.src = `${typo3BaseUrl}/typo3conf/ext/pixelcoda_fe_editor/Resources/Public/editor.js`;
    editorJs.type = 'module';
    editorJs.async = true;
    document.body.appendChild(editorJs);

    // Cleanup on unmount
    return () => {
      editorCss.remove();
      editorJs.remove();
    };
  }, []);

  return null;
}
