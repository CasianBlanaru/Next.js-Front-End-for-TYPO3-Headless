import type { T3ContentElement } from './T3ContentElement';
import type { T3File } from './T3File';
import type { T3Link } from './T3Link';
import type { T3CeBaseProps } from './content/T3CeBase';

export interface T3RedirectData {
  redirectUrl?: string;
  statusCode?: number;
}

export interface T3Navigation {
  title: string;
  link: string;
  target?: string;
  active?: number;
  current?: number;
  spacer?: number;
  hasSubpages?: number;
  children?: T3Navigation[];
}

export interface T3I18N {
  languageId: number;
  locale: string;
  title: string;
  navigationTitle?: string;
  twoLetterIsoCode?: string;
  hreflang?: string;
  direction?: 'ltr' | 'rtl';
  flag?: string;
  link: string;
  active?: number;
  current?: number;
  available?: number;
}

export interface T3Robots {
  noIndex?: boolean;
  noFollow?: boolean;
  [key: string]: unknown;
}

export interface T3Meta {
  title?: string;
  subtitle?: string;
  abstract?: string;
  description?: string;
  keywords?: string;
  canonical?: T3Link | { href?: string; link?: string };
  robots?: T3Robots;
  author?: string;
  authorEmail?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: T3File | null;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterCard?: string;
  twitterImage?: T3File | null;
}

export interface T3PageAppearance {
  backendLayout?: string;
  layout?: string;
  [key: string]: unknown;
}

export interface T3Breadcrumb {
  title?: string;
  label?: string;
  link?: string;
  url?: string;
  target?: string;
  active?: boolean | number;
  current?: boolean | number;
}

export interface T3Page extends T3RedirectData {
  id?: number;
  title: string;
  type?: string;
  slug?: string;
  media?: T3File[];
  meta?: T3Meta;
  categories?: string | string[];
  breadcrumbs?: T3Breadcrumb[];
  appearance?: T3PageAppearance;
  content?: Record<string, T3ContentElement<T3CeBaseProps>[]>;
  i18n?: T3I18N[];
  contentItems?: Array<{ type: string; props: Record<string, unknown> }>;
}

export interface T3InitialData {
  navigation?: T3Navigation[];
  i18n?: T3I18N[];
  [key: string]: unknown;
}
