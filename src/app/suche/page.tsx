import React from 'react';
import { siteConfig } from '../../lib/config';
import DevTools from '../../components/DevTools';
import { Metadata } from 'next';
import { Typo3SearchResponse, Typo3SearchResult } from '../../types/typo3';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const q = (resolvedSearchParams?.q as string) || '';
  return {
    title: q ? `Suchergebnisse für "${q}" - TYPO3 Headless` : 'Website durchsuchen - TYPO3 Headless',
    description: 'Suchen Sie auf unserer Website nach Inhalten.',
  };
}

export default async function SuchePage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const q = (resolvedSearchParams?.q as string) || '';
  const collections = (resolvedSearchParams?.collections as string) || 'pages,tt_content';
  const page = (resolvedSearchParams?.page as string) || '1';
  const perPage = (resolvedSearchParams?.per_page as string) || '10';
  const activeType = (resolvedSearchParams?.type as string) || 'all';

  let results: Typo3SearchResponse | null = null;
  let error: string | null = null;

  if (q && q.trim().length >= 3) {
    const typo3Origin = siteConfig.typo3BaseUrl.replace(/\/$/, '');
    const url = `${typo3Origin}/?type=1701&q=${encodeURIComponent(q)}&collections=${encodeURIComponent(collections)}&page=${page}&per_page=${perPage}`;

    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`TYPO3 Search API returned status ${response.status}`);
      }

      results = await response.json();
    } catch (e: unknown) {
      error = e instanceof Error ? e.message : String(e);
    }
  }

  // Calculate facets from the retrieved page results
  const totalCount = results?.data?.length || 0;
  const pagesCount = results?.data?.filter((item: Typo3SearchResult) => item.attributes?.type === 'page').length || 0;
  const contentCount = totalCount - pagesCount;

  // Filter displayed results based on active facet
  let displayedResults = results?.data || [];
  if (activeType === 'page') {
    displayedResults = displayedResults.filter((item: Typo3SearchResult) => item.attributes?.type === 'page');
  } else if (activeType === 'content') {
    displayedResults = displayedResults.filter((item: Typo3SearchResult) => item.attributes?.type !== 'page');
  }

  // Pagination parameters
  const currentPage = parseInt(page, 10);
  const totalPages = parseInt(
    String(results?.meta?.total_pages || results?.meta?.pagination?.pages || '1'),
    10
  );

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Suche</p>
          <h1>{q ? `Suchergebnisse für "${q}"` : 'Website durchsuchen'}</h1>
          <p>
            {q
              ? `Wir haben ${results?.meta?.total || 0} Treffer für Ihre Suchanfrage gefunden.`
              : 'Suchen Sie nach Inhalten, Artikeln und Seiten auf unserer TYPO3-Website.'}
          </p>
        </div>
      </section>

      <section className="content-shell">
        {/* Search Box */}
        <div className="pixelcoda-search-shell" style={{ marginBottom: '2.5rem' }}>
          <header>
            <h2>Neue Suche starten</h2>
          </header>
          <form className="pixelcoda-search-form" action="/suche" method="get">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Website durchsuchen..."
              aria-label="Website durchsuchen..."
              required
            />
            <input type="hidden" name="collections" value={collections} />
            <button type="submit">Suchen</button>
          </form>
        </div>

        {error && (
          <div className="error-box">
            <h2>Fehler bei der Suche</h2>
            <p>{error}</p>
          </div>
        )}

        {q && q.trim().length < 3 && (
          <div className="error-box" style={{ background: '#fffbeb', borderColor: '#fef3c7', color: '#92400e' }}>
            <h2>Suchanfrage zu kurz</h2>
            <p>Bitte geben Sie mindestens 3 Zeichen ein, um die Suche zu starten.</p>
          </div>
        )}

        {/* Facets & Results */}
        {q && q.trim().length >= 3 && results && (
          <div className="search-results-container">
            {/* Facet Filters */}
            {totalCount > 0 && (
              <div
                className="search-facets"
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginBottom: '2rem',
                  flexWrap: 'wrap',
                }}
              >
                <a
                  href={`/suche?q=${encodeURIComponent(q)}&type=all`}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    background: activeType === 'all' ? 'var(--green)' : '#fff',
                    color: activeType === 'all' ? '#fff' : 'var(--text)',
                    border: '1px solid',
                    borderColor: activeType === 'all' ? 'var(--green)' : 'var(--border)',
                    transition: 'all 0.15s ease-in-out',
                  }}
                >
                  Alle ({totalCount})
                </a>
                <a
                  href={`/suche?q=${encodeURIComponent(q)}&type=page`}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    background: activeType === 'page' ? 'var(--green)' : '#fff',
                    color: activeType === 'page' ? '#fff' : 'var(--text)',
                    border: '1px solid',
                    borderColor: activeType === 'page' ? 'var(--green)' : 'var(--border)',
                    transition: 'all 0.15s ease-in-out',
                  }}
                >
                  Seiten ({pagesCount})
                </a>
                <a
                  href={`/suche?q=${encodeURIComponent(q)}&type=content`}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    background: activeType === 'content' ? 'var(--green)' : '#fff',
                    color: activeType === 'content' ? '#fff' : 'var(--text)',
                    border: '1px solid',
                    borderColor: activeType === 'content' ? 'var(--green)' : 'var(--border)',
                    transition: 'all 0.15s ease-in-out',
                  }}
                >
                  Inhalte ({contentCount})
                </a>
              </div>
            )}

            {/* Results List */}
            <div className="search-results-list">
              {displayedResults.length > 0 ? (
                displayedResults.map((result: Typo3SearchResult) => {
                  const attrs = result.attributes || {};
                  return (
                    <article className="content-element" key={result.id}>
                      <p className="eyebrow" style={{ color: 'var(--green)' }}>
                        {attrs.type === 'page' ? 'Seite' : 'Inhalt'}
                      </p>
                      <h2>
                        <a href={attrs.url || '/'}>{attrs.title || 'Ohne Titel'}</a>
                      </h2>
                      {attrs.abstract && <p className="lead">{attrs.abstract}</p>}
                    </article>
                  );
                })
              ) : (
                <div
                  className="empty-state"
                  style={{ background: '#f8fafc', borderColor: '#e2e8f0', color: '#475569' }}
                >
                  <h2>Keine Ergebnisse in dieser Kategorie</h2>
                  <p>
                    Es wurden keine Suchergebnisse für die ausgewählte Kategorie &quot;{activeType === 'page' ? 'Seiten' : 'Inhalte'}&quot; gefunden.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div
                className="search-pagination"
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'center',
                  marginTop: '3.5rem',
                  alignItems: 'center',
                }}
              >
                {/* Prev Button */}
                {currentPage > 1 ? (
                  <a
                    href={`/suche?q=${encodeURIComponent(q)}&page=${currentPage - 1}&type=${activeType}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '40px',
                      height: '40px',
                      padding: '0 1rem',
                      borderRadius: '8px',
                      background: '#fff',
                      color: 'var(--text)',
                      border: '1px solid var(--border)',
                      textDecoration: 'none',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                    }}
                  >
                    &laquo; Zurück
                  </a>
                ) : (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '40px',
                      height: '40px',
                      padding: '0 1rem',
                      borderRadius: '8px',
                      background: '#f1f5f9',
                      color: '#94a3b8',
                      border: '1px solid var(--border)',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      cursor: 'not-allowed',
                    }}
                  >
                    &laquo; Zurück
                  </span>
                )}

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => {
                  const isActive = p === currentPage;
                  return isActive ? (
                    <span
                      key={p}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: 'var(--green)',
                        color: '#fff',
                        fontWeight: '800',
                        fontSize: '0.9rem',
                      }}
                    >
                      {p}
                    </span>
                  ) : (
                    <a
                      key={p}
                      href={`/suche?q=${encodeURIComponent(q)}&page=${p}&type=${activeType}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: '#fff',
                        color: 'var(--text)',
                        border: '1px solid var(--border)',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                      }}
                    >
                      {p}
                    </a>
                  );
                })}

                {/* Next Button */}
                {currentPage < totalPages ? (
                  <a
                    href={`/suche?q=${encodeURIComponent(q)}&page=${currentPage + 1}&type=${activeType}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '40px',
                      height: '40px',
                      padding: '0 1rem',
                      borderRadius: '8px',
                      background: '#fff',
                      color: 'var(--text)',
                      border: '1px solid var(--border)',
                      textDecoration: 'none',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                    }}
                  >
                    Weiter &raquo;
                  </a>
                ) : (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '40px',
                      height: '40px',
                      padding: '0 1rem',
                      borderRadius: '8px',
                      background: '#f1f5f9',
                      color: '#94a3b8',
                      border: '1px solid var(--border)',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      cursor: 'not-allowed',
                    }}
                  >
                    Weiter &raquo;
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      <DevTools page={{ title: 'Suche', content: {} }} />
    </main>
  );
}
