export interface Typo3Page {
  id?: number | string;
  type?: string;
  slug?: string;
  title?: string;
  seo?: {
    title?: string;
    description?: string;
  };
  meta?: {
    title?: string;
    description?: string;
    abstract?: string;
  };
  content?: Record<string, Typo3ContentElement[]>;
  [key: string]: any;
}

export interface Typo3ContentElement {
  id: number | string;
  type: string;
  uid?: number;
  CType?: string;
  content?: any;
  appearance?: any;
  [key: string]: any;
}

export interface SiteConfig {
  apiBaseUrl: string;
  typo3BaseUrl: string;
  baseUrl: string;
  frontendFileApi: string;
  searchApiBaseUrl: string;
  skin: string;
  devtools: boolean;
}
