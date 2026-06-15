import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { T3Page } from '@/types';
import T3Renderer from '@components/layout/T3Renderer/T3Renderer';
import ResponsiveContainer from '@components/layout/ResponsiveContainer/ResponsiveContainer';
import { getColumnElements, getPixelcodaMeta } from '@/lib/pixelcoda';
import { getLayoutComponent } from '@/layouts/layoutRegistry';

const HeadlessDevTools = dynamic(() => import('@components/devtools/HeadlessDevTools'), { ssr: false });

interface PageContentProps {
  pageData: T3Page;
}

function Breadcrumbs({ breadcrumbs }: { breadcrumbs?: Array<Record<string, any>> }) {
  if (!Array.isArray(breadcrumbs) || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600">
      <ol className="flex flex-wrap gap-2">
        {breadcrumbs.map((crumb, index) => {
          const title = crumb.title || crumb.label || 'Page';
          const href = crumb.link || crumb.url || '/';

          return (
            <li key={index} className="after:content-[','] after:ml-2 after:text-slate-400 last:after:content-['']">
              {href ? (
                <Link href={href} className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {title}
                </Link>
              ) : (
                <span>{title}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function ContentLayout({ pageData, layoutId }: { pageData: T3Page; layoutId?: string }) {
  const layout = getLayoutComponent(layoutId);
  const inner = (
    <section className="grid gap-8">
      {Object.entries(pageData.content || {}).map(([column, elements]) => (
        <div key={column} className="space-y-8" aria-label={`Content column ${column}`} data-pixelcoda-colpos={column}>
          <T3Renderer content={elements} />
        </div>
      ))}
    </section>
  );
  return React.createElement(layout, { title: pageData.title }, inner);
}

export default function PageContent({ pageData }: PageContentProps) {
  const pixelcoda = getPixelcodaMeta(pageData as unknown as Record<string, unknown>);
  const containerColumns = pixelcoda.container?.columns ?? [];
  const hasContainerColumns = containerColumns.length > 0;
  const layoutId = pixelcoda.layout?.identifier ?? pageData.appearance?.backendLayout;

  return (
    <>
      <main id="main-content" className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <Breadcrumbs breadcrumbs={pageData.breadcrumbs as Array<Record<string, any>>} />
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{pageData.title}</h1>
            {pageData.meta?.description ? <p className="max-w-3xl text-lg leading-8 text-slate-600">{pageData.meta.description}</p> : null}
          </header>
        </div>

        {hasContainerColumns ? (
          <ResponsiveContainer
            columns={containerColumns}
            responsive={pixelcoda.responsive}
            order={pixelcoda.order}
            gap={pixelcoda.spacing?.gap}
            width={pixelcoda.width}
          >
            {containerColumns.map((column) => (
              <T3Renderer key={`${column.name}-${column.colPos}`} content={getColumnElements(pageData.content, column)} />
            ))}
          </ResponsiveContainer>
        ) : (
          <ContentLayout pageData={pageData} layoutId={layoutId} />
        )}
      </main>
      <HeadlessDevTools pageData={pageData} />
    </>
  );
}
