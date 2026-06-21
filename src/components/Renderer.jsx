import { T3Frame } from '@pixelcoda/headless-nextjs';
import { flattenContent, getBestImageUrl, normalizeMediaUrl } from '../lib/typo3';

function isTypo3Error(element) {
  const bodytext = element?.content?.bodytext || element?.content?.html || '';
  return typeof bodytext === 'string' && bodytext.startsWith('Oops, an error occurred!');
}

export function PixelcodaSearchElement({ element }) {
  const content = element.content || {};
  const config = content.searchConfig || {};
  const ui = content.ui || {};
  const placeholder = config.placeholder || content.placeholder || 'Website durchsuchen...';
  const collections = config.collections || 'pages,tt_content';
  const pcMeta = content._pixelcoda || {};

  return (
    <T3Frame 
      id={`c${element.id}`} 
      frameClass={element.appearance?.frameClass} 
      layout={element.appearance?.layout}
      spaceBefore={element.appearance?.spaceBefore}
      spaceAfter={element.appearance?.spaceAfter}
    >
      <section 
        className="pixelcoda-search-shell" 
        data-t3-uid={element.id} 
        data-t3-type={element.type}
        data-pixelcoda-uid={pcMeta.uid}
        data-pixelcoda-ctype={pcMeta.ctype || element.type}
        data-pixelcoda-edit-url={pcMeta.backendEditUrl}
      >
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
    </T3Frame>
  );
}

function getElementMedia(element) {
  const content = element.content || {};
  if (Array.isArray(content.media)) return content.media;

  const columns = content.gallery?.rows?.flatMap((row) => row.columns || []) || [];
  return columns;
}

export function TextElement({ element }) {
  const content = element.content || {};
  const media = getElementMedia(element);
  const pcMeta = content._pixelcoda || {};

  return (
    <T3Frame 
      id={`c${element.id}`} 
      frameClass={element.appearance?.frameClass} 
      layout={element.appearance?.layout}
      spaceBefore={element.appearance?.spaceBefore}
      spaceAfter={element.appearance?.spaceAfter}
    >
      <article 
        className={`content-element content-element--${element.type}`} 
        data-t3-uid={element.id} 
        data-t3-type={element.type}
        data-pixelcoda-uid={pcMeta.uid}
        data-pixelcoda-ctype={pcMeta.ctype || element.type}
        data-pixelcoda-edit-url={pcMeta.backendEditUrl}
      >
        {content.header ? <h2>{content.header}</h2> : null}
        {content.subheader ? <p className="lead">{content.subheader}</p> : null}
        {media.length ? (
          <div className="content-media">
            {media.map((file, index) => {
              const src = normalizeMediaUrl(getBestImageUrl(file) || file.publicUrl);
              if (!src) return null;
              const alt = file?.properties?.alternative || file?.properties?.title || content.header || '';
              return <img key={`${src}-${index}`} src={src} alt={alt} loading="lazy" />;
            })}
          </div>
        ) : null}
        {content.bodytext ? <div className="content-body" dangerouslySetInnerHTML={{ __html: content.bodytext }} /> : null}
      </article>
    </T3Frame>
  );
}

function renderElement(element) {
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

export const rendererComponents = {
  pixelcodasearch_search: PixelcodaSearchElement,
  text: TextElement,
  textpic: TextElement,
  textmedia: TextElement,
  image: TextElement,
  html: TextElement,
};

export default function Renderer({ page }) {
  const elements = flattenContent(page?.content);
  if (!elements.length) {
    return <p className="empty-state">No TYPO3 content returned for this page.</p>;
  }
  return elements.map((element) => (
    <div className="renderer-item" key={`${element.__colPos}-${element.id || element.__index}`}>
      {renderElement(element)}
    </div>
  ));
}
