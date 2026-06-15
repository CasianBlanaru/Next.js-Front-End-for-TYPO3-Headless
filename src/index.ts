// @pixelcoda/headless-nextjs
// Public API — import from this file

// ── Types ────────────────────────────────────────────────────────────────────
export type {
  T3Page,
  T3ContentElement,
  T3File,
  T3Gallery,
  T3Menu,
  T3Appearance,
  T3Site,
  T3Options,
  T3MenuAbstract,
  T3HtmlParserProps,
} from './types';
export type { T3Link as T3LinkType } from './types/T3Link';
export type { T3CeBaseProps } from './types/content';
export type {
  PixelcodaHeadlessMeta,
  PixelcodaContainerColumn,
  PixelcodaResponsiveSettings,
<<<<<<< HEAD
  PixelcodaGapPreset,
  PixelcodaWidthPreset,
  PixelcodaOrderSettings,
=======
>>>>>>> 60a14d9 (chore: prepare release v1.0.0-alpha.1 and sync changes)
} from './types/pixelcoda';

// ── Config ───────────────────────────────────────────────────────────────────
export { getActiveSkin, isPremiumSkin } from './config/skin';
export type { SkinName } from './config/skin';

// ── Services ─────────────────────────────────────────────────────────────────
export { t3Fetch, filterQuery, getT3ApiBaseUrl, getSiteUrl, t3SiteOptions } from './services/api';
export { normalizeFileUrl } from './services/media';
export { getPageMetadata } from './services/metadata';
export { getPageData, getPageBySlug, getHomepageData } from './services/pages';
export { getSitemapRoutes, getNavigation } from './services/navigation';
export { getNewsList, getNewsDetail } from './services/news';

<<<<<<< HEAD
// ── Lib / PixelCoda Compatibility Layer ──────────────────────────────────────
=======
// ── Lib ───────────────────────────────────────────────────────────────────────
>>>>>>> 60a14d9 (chore: prepare release v1.0.0-alpha.1 and sync changes)
export { getPixelcodaMeta, getColumnElements } from './lib/pixelcoda/normalize';
export {
  getResponsiveGridClasses,
  getResponsiveColumnSpan,
  getWidthClass,
  getGapClass,
} from './lib/pixelcoda/responsive';
export { normalizeFileUrl as normalizeProxyUrl } from './lib/mediaProxy';
export { createPreviewContext, isPreviewMode, buildPreviewQuery } from './lib/preview';

<<<<<<< HEAD
// ── Component Registry ────────────────────────────────────────────────────────
export { getComponent, DynamicComponentRenderer } from './registry/index';
export type { RegistryOptions } from './registry/index';

// ── Layout Registry ───────────────────────────────────────────────────────────
export { getLayoutComponent, default as layoutRegistry } from './layouts/layoutRegistry';
=======
// ── Registry ──────────────────────────────────────────────────────────────────
export { getComponent, DynamicComponentRenderer } from './registry/index';
export type { RegistryOptions } from './registry/index';

// ── Layouts ───────────────────────────────────────────────────────────────────
export { getLayoutComponent } from './layouts/layoutRegistry';
>>>>>>> 60a14d9 (chore: prepare release v1.0.0-alpha.1 and sync changes)
export type { LayoutRendererProps, LayoutIdentifier } from './layouts/layoutRegistry';

// ── Hooks ─────────────────────────────────────────────────────────────────────
export { default as componentMap } from './hooks/componentMap';
export { useT3Meta } from './hooks/useT3Meta';
export { useT3Options } from './hooks/useT3Options';
export { useT3Utils } from './hooks/useT3Utils';
export { useT3i18n } from './hooks/useT3i18n';

<<<<<<< HEAD
// ── Layout Components ─────────────────────────────────────────────────────────
=======
// ── Components — Layout ───────────────────────────────────────────────────────
>>>>>>> 60a14d9 (chore: prepare release v1.0.0-alpha.1 and sync changes)
export { default as ResponsiveContainer } from './components/layout/ResponsiveContainer/ResponsiveContainer';
export { default as T3Renderer } from './components/layout/T3Renderer/T3Renderer';
export { default as PageContent } from './components/layout/PageContent';
export { default as T3Frame } from './components/layout/T3Frame/T3Frame';
export { default as ComponentErrorBoundary } from './components/layout/ComponentErrorBoundary';

<<<<<<< HEAD
// ── Media Components ──────────────────────────────────────────────────────────
export { default as Typo3Image } from './components/media/Typo3Image';
export { default as MediaFile } from './components/media/MediaFile/MediaFile';

// ── Navigation ────────────────────────────────────────────────────────────────
export { default as T3Link } from './components/navigation/T3Link/T3Link';
export { default as T3LocaleSwitcher } from './components/navigation/T3LocaleSwitcher/T3LocaleSwitcher';

// ── Headless DevTools ─────────────────────────────────────────────────────────
export { default as HeadlessDevTools } from './components/devtools/HeadlessDevTools';
export { default as DevToolsWrapper } from './components/devtools/DevToolsWrapper';
export { isDevToolsEnabled } from './components/devtools/devtoolsConfig';

// ── Premium Skin ──────────────────────────────────────────────────────────────
export {
  premiumSkin,
  PremiumLayout,
  PremiumHero,
  PremiumFeatureGrid,
  PremiumNewsList,
  PremiumCTA,
} from './skins/premium';
export { defaultSkin } from './skins/default';

// ── Content Components ────────────────────────────────────────────────────────
=======
// ── Components — Media ────────────────────────────────────────────────────────
export { default as Typo3Image } from './components/media/Typo3Image';
export { default as MediaFile } from './components/media/MediaFile/MediaFile';

// ── Components — Navigation ───────────────────────────────────────────────────
export { default as T3Link } from './components/navigation/T3Link/T3Link';
export { default as T3LocaleSwitcher } from './components/navigation/T3LocaleSwitcher/T3LocaleSwitcher';

// ── Components — DevTools ─────────────────────────────────────────────────────
export { default as HeadlessDevTools } from './components/devtools/HeadlessDevTools';
export { default as DevToolsWrapper } from './components/devtools/DevToolsWrapper';

// ── Components — Content ──────────────────────────────────────────────────────
>>>>>>> 60a14d9 (chore: prepare release v1.0.0-alpha.1 and sync changes)
export { default as T3CeText } from './components/content/T3CeText/T3CeText';
export { default as T3CeHeader } from './components/content/T3CeHeader/T3CeHeader';
export { default as T3CeImage } from './components/content/T3CeImage/T3CeImage';
export { default as T3CeTextpic } from './components/content/T3CeTextpic/T3CeTextpic';
export { default as T3CeHtml } from './components/content/T3CeHtml/T3CeHtml';
export { default as T3CeTable } from './components/content/T3CeTable/T3CeTable';
export { default as T3CeUploads } from './components/content/T3CeUploads/T3CeUploads';
export { default as T3CeBullets } from './components/content/T3CeBullets/T3CeBullets';
export { default as T3MediaGallery } from './components/content/T3MediaGallery/T3MediaGallery';
