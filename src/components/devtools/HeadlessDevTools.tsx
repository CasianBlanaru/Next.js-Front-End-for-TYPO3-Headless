'use client';

import { useEffect, useMemo, useState } from 'react';
import type { T3Page, T3ContentElement } from '@/types';
import { getPixelcodaMeta } from '@/lib/pixelcoda';
import { isDevToolsEnabled } from './devtoolsConfig';

type Panel = 'inspector' | 'json' | 'layout' | 'api' | 'mapping';

interface HeadlessDevToolsProps {
  pageData: T3Page;
}

function flattenContent(pageData: T3Page) {
  return Object.entries(pageData.content ?? {}).flatMap(([column, elements]) =>
    (elements ?? []).map((element, index) => ({ column, element, index })),
  );
}

function getMappedComponent(type: string) {
  const normalized = type.toLowerCase();
  const map: Record<string, string> = {
    text: 'T3CeText',
    textpic: 'T3CeTextpic',
    textmedia: 'T3CeTextpic',
    image: 'T3CeImage',
    html: 'T3CeHtml',
    table: 'T3CeTable',
    uploads: 'T3CeUploads',
    bullets: 'T3CeBullets',
    shortcut: 'T3CeShortcut',
    menu_pages: 'T3CeMenuPages',
    menu_subpages: 'T3CeMenuSubpages',
    menu_sitemap_pages: 'T3CeMenuSitemapPages',
    news_list: 'T3CeNewsList',
    news_detail: 'T3CeNewsDetail',
    headless_news: 'T3CeNewsList',
    container: 'ResponsiveContainer',
  };

  return map[normalized] ?? 'FallbackRenderer';
}

export default function HeadlessDevTools({ pageData }: HeadlessDevToolsProps) {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>('inspector');
  const [selectedUid, setSelectedUid] = useState<number | null>(null);

  const elements = useMemo(() => flattenContent(pageData), [pageData]);
  const selected = useMemo(
    () => elements.find(({ element }) => element.id === selectedUid)?.element,
    [elements, selectedUid],
  );
  const pageMeta = getPixelcodaMeta(pageData as unknown as Record<string, unknown>);

useEffect(() => {
    if (!isDevToolsEnabled()) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const modifier = event.metaKey || event.ctrlKey;
      if (modifier && event.shiftKey && event.key.toLowerCase() === 'h') {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!isDevToolsEnabled()) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const elementNode = target?.closest<HTMLElement>('[data-t3-uid]');
      if (!elementNode) return;

      setSelectedUid(Number(elementNode.dataset.t3Uid));
      setOpen(true);
      setPanel('json');
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  if (!isDevToolsEnabled()) return null;

  return (
    <div className="pixelcoda-devtools" aria-live="polite">
      <button
        type="button"
        className="fixed bottom-4 right-4 z-[9998] rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-xl ring-1 ring-white/10"
        onClick={() => setOpen((current) => !current)}
      >
        Headless DevTools
      </button>

      {open ? (
        <aside className="fixed bottom-20 right-4 z-[9999] flex max-h-[80vh] w-[min(96vw,720px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between border-b border-slate-200 bg-slate-950 px-4 py-3 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-orange-300">PixelCoda Headless</p>
              <h2 className="text-base font-semibold">Developer Inspector</h2>
            </div>
            <button type="button" className="rounded-md px-2 py-1 text-sm hover:bg-white/10" onClick={() => setOpen(false)}>
              Close
            </button>
          </header>

          <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50 p-2 text-sm">
            {(['inspector', 'json', 'layout', 'api', 'mapping'] as Panel[]).map((item) => (
              <button
                key={item}
                type="button"
                className={`rounded-lg px-3 py-2 ${panel === item ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600 hover:bg-white'}`}
                onClick={() => setPanel(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="overflow-auto p-4 text-sm text-slate-700">
            {panel === 'inspector' ? (
              <div className="space-y-3">
                <p className="text-slate-500">Click a highlighted TYPO3 element on the page or select one below.</p>
                <div className="grid gap-2">
                  {elements.map(({ column, element, index }) => (
                    <button
                      key={`${column}-${element.id}-${index}`}
                      type="button"
                      className="rounded-xl border border-slate-200 p-3 text-left hover:border-orange-400 hover:bg-orange-50"
                      onClick={() => {
                        setSelectedUid(element.id);
                        setPanel('json');
                      }}
                    >
                      <span className="font-semibold">#{element.id}</span> {element.type}{' '}
                      <span className="text-slate-500">in {column}</span>
                      <span className="ml-2 rounded bg-slate-100 px-2 py-1 text-xs">{getMappedComponent(element.type)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {panel === 'json' ? (
              <pre className="max-h-[48vh] overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                {JSON.stringify(selected ?? pageData, null, 2)}
              </pre>
            ) : null}

            {panel === 'layout' ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 p-4">
                  <h3 className="font-semibold text-slate-950">Page Layout</h3>
                  <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                    <dt className="text-slate-500">Backend layout</dt>
                    <dd>{pageData.appearance?.backendLayout ?? 'default'}</dd>
                    <dt className="text-slate-500">PixelCoda layout</dt>
                    <dd>{pageMeta.layout?.identifier ?? 'not provided'}</dd>
                    <dt className="text-slate-500">Width</dt>
                    <dd>{pageMeta.width ?? 'contained'}</dd>
                    <dt className="text-slate-500">Gap</dt>
                    <dd>{pageMeta.spacing?.gap ?? 'md'}</dd>
                  </dl>
                </div>
                <pre className="rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{JSON.stringify(pageMeta, null, 2)}</pre>
              </div>
            ) : null}

            {panel === 'api' ? (
              <div className="space-y-4">
                <dl className="grid gap-2 sm:grid-cols-2">
                  <dt className="text-slate-500">Page ID</dt>
                  <dd>{pageData.id ?? 'unknown'}</dd>
                  <dt className="text-slate-500">Slug</dt>
                  <dd>{pageData.slug ?? '/'}</dd>
                  <dt className="text-slate-500">Language entries</dt>
                  <dd>{pageData.i18n?.length ?? 0}</dd>
                </dl>
                <pre className="max-h-[42vh] overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
                  {JSON.stringify(pageData, null, 2)}
                </pre>
              </div>
            ) : null}

            {panel === 'mapping' ? (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-3 py-2">TYPO3 type</th>
                      <th className="px-3 py-2">Renderer</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...new Set(elements.map(({ element }) => element.type))].map((type) => {
                      const renderer = getMappedComponent(type);
                      const missing = renderer === 'FallbackRenderer';
                      return (
                        <tr key={type} className="border-t border-slate-100">
                          <td className="px-3 py-2 font-mono">{type}</td>
                          <td className="px-3 py-2">{renderer}</td>
                          <td className="px-3 py-2">{missing ? 'Missing' : 'Mapped'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </aside>
      ) : null}
    </div>
  );
}
