"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Typo3Page, Typo3ContentElement } from '../types/typo3';
import { flattenContent, getBestImageUrl, normalizeMediaUrl } from '../lib/typo3';
import { ContentElement } from './ContentElement';
import { T3Frame } from '@pixelcoda/headless-nextjs';

// Dynamically import heavy components
const GsapAnimatedContent = dynamic(() => import('./GsapAnimatedContent').then(mod => mod.GsapAnimatedContent), {
  ssr: false,
});

interface RendererProps {
  page: Typo3Page;
}

interface ElementProps {
  element: Typo3ContentElement;
}

function isTypo3Error(element: Typo3ContentElement) {
  const bodytext = element?.content?.bodytext || element?.content?.html || '';
  return typeof bodytext === 'string' && bodytext.startsWith('Oops, an error occurred!');
}

export function PixelcodaSearchElement({ element }: ElementProps) {
  const content = element.content || {};
  const config = content.searchConfig || {};
  const ui = content.ui || {};
  const placeholder = config.placeholder || content.placeholder || 'Website durchsuchen...';
  const collections = config.collections || 'pages,tt_content';

  return (
    <T3Frame 
      id={`c${element.id}`} 
      frameClass={element.appearance?.frameClass} 
      layout={element.appearance?.layout}
      spaceBefore={element.appearance?.spaceBefore}
      spaceAfter={element.appearance?.spaceAfter}
    >
      <ContentElement content={content}>
        <section className="pixelcoda-search-shell">
        <header>
          <p className="eyebrow">PixelCoda Search</p>
          <h2>{content.header || 'Suche'}</h2>
          {content.subheader ? <p>{content.subheader}</p> : null}
        </header>
        <form className="pixelcoda-search-form" action="/suche" method="get">
          <input type="search" name="q" placeholder={placeholder} aria-label={placeholder} />
          <input type="hidden" name="collections" value={collections} />
          <button type="submit">Suchen</button>
        </form>
        {ui.showAsk || config.enableAsk ? (
          <div className="pixelcoda-search-ask">KI-Antworten sind fuer diese Suche vorbereitet.</div>
        ) : null}
      </section>
      </ContentElement>
    </T3Frame>
  );
}

function getElementMedia(element: Typo3ContentElement) {
  const content = element.content || {};
  if (Array.isArray(content.media)) return content.media;

  const rows = content.gallery?.rows;
  if (!rows) return [];
  
  const rowsArray = Array.isArray(rows) ? rows : Object.values(rows);
  
  const columns: any[] = rowsArray.flatMap((row: any) => {
    const cols = row.columns || [];
    return Array.isArray(cols) ? cols : Object.values(cols);
  });
  
  return columns;
}

export function TextElement({ element }: ElementProps) {
  const content = element.content || {};
  const media = getElementMedia(element);

  return (
    <T3Frame 
      id={`c${element.id}`} 
      frameClass={element.appearance?.frameClass} 
      layout={element.appearance?.layout}
      spaceBefore={element.appearance?.spaceBefore}
      spaceAfter={element.appearance?.spaceAfter}
    >
      <ContentElement content={content}>
        <article className={`content-element content-element--${element.type}`}>
        {content.header ? (
          <h2 data-pc-field="" data-table="tt_content" data-uid={element.id} data-field="header">
            {content.header}
          </h2>
        ) : null}
        {content.subheader ? (
          <p className="lead" data-pc-field="" data-table="tt_content" data-uid={element.id} data-field="subheader">
            {content.subheader}
          </p>
        ) : null}
        {media.length ? (
          <div className="content-media">
            {media.map((file: any, index: number) => {
              const src = normalizeMediaUrl(getBestImageUrl(file) || file.publicUrl);
              if (!src) return null;
              const alt = file?.properties?.alternative || file?.properties?.title || content.header || '';
              return <img key={`${src}-${index}`} src={src} alt={alt} loading="lazy" />;
            })}
          </div>
        ) : null}
        {content.bodytext ? (
          <div 
            className="content-body" 
            data-pc-field="" 
            data-table="tt_content" 
            data-uid={element.id} 
            data-field="bodytext" 
            dangerouslySetInnerHTML={{ __html: content.bodytext }} 
          />
        ) : null}
      </article>
      </ContentElement>
    </T3Frame>
  );
}

function renderElement(element: Typo3ContentElement) {
  if (isTypo3Error(element)) {
    return (
      <div className="error-box" data-t3-uid={element.id} data-t3-type={element.type}>
        <h2>TYPO3 Headless Fehler</h2>
        <p>{element.content.bodytext}</p>
        <p>Der TYPO3-Renderer hat eine Exception geliefert. Nach einem TYPO3 Cache-Flush sollte der neue Headless-Renderer greifen.</p>
      </div>
    );
  }

  if (element.type === 'pixelcodasearch_search') {
    return <PixelcodaSearchElement element={element} />;
  }

  if (element.type === 'pc_demo') {
    return <TextElement element={{ ...element, type: 'text' }} />;
  }

  if (['text', 'textpic', 'textmedia', 'image', 'html'].includes(element.type)) {
    return <TextElement element={element} />;
  }

  return <TextElement element={element} />;
}

export default function Renderer({ page }: RendererProps) {
  const elements = flattenContent(page?.content);
  if (!elements.length) {
    return <p className="empty-state">No TYPO3 content returned for this page.</p>;
  }
  return (
    <>
      {elements.map((element) => {
        const animationSettings = element?.content?.animationSettings || element?.animationSettings || null;
        const rendered = renderElement(element);
        return (
          <div className="renderer-item" key={`${element.__colPos}-${element.id || element.__index}`}>
            {animationSettings ? (
              <GsapAnimatedContent animationSettings={animationSettings}>
                {rendered}
              </GsapAnimatedContent>
            ) : rendered}
          </div>
        );
      })}
    </>
  );
}
