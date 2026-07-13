import type { ReactNode } from 'react';
import type { T3CeBaseProps } from './content';
import type { T3Link } from './T3Link';

export type { T3File } from './T3File';
export * from './T3BackendLayout';
export * from './T3ContentElement';
export * from './T3MenuAbstract';
export * from './T3Link';
export * from './T3Page';
export * from './T3Appearance';
export * from './T3Menu';
export * from './T3Gallery';
export * from './content';

export interface T3Site {
  baseUrl?: string;
  locale?: string;
  api: {
    baseUrl: string;
    headers?: Record<string, string>;
    credentials?: 'include' | 'omit' | 'same-origin';
    proxyReqHeaders?: false | string[];
    proxyHeaders?: false | string[];
    allowQuery?: boolean | string[];
    endpoints?: {
      initialData?: string;
      initialDataFallback?: string;
    };
  };
  i18n: {
    default: string;
    locales: string[];
  };
  features?: {
    initInitialData?: boolean;
    i18nMiddleware?: boolean;
    debug?: boolean;
  };
}

export type T3Sites = {
  hostname: string | string[];
} & T3Site;

export interface T3Options extends T3Site {
  sites?: T3Sites[];
}

export interface T3BackendLayoutProps {
  content: {
    colPos0: unknown[];
    [key: string]: unknown[];
  };
}

export interface MenuItem {
  link: string;
  title: string;
  target?: string;
  children?: MenuItem[];
}

export interface T3MenuAbstract extends MenuItem {}

export interface T3CeMenuPagesProps {
  menu: MenuItem[];
  link: T3Link;
  header?: string;
  headerLayout?: number;
  appearance?: unknown;
  children?: ({ link }: { link: T3Link }) => React.ReactNode;
}

export interface ModuleOptions extends Partial<T3Options> {}

export interface T3HtmlParserProps {
  content: string | string[][];
}
