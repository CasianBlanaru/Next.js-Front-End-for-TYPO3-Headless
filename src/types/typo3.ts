export interface Typo3MediaProperties {
  title?: string;
  alternative?: string;
  description?: string;
  link?: string;
  originalUrl?: string;
  publicUrl?: string;
  [key: string]: unknown;
}

export interface Typo3CropVariant {
  publicUrl?: string;
  [key: string]: unknown;
}

export interface Typo3File {
  publicUrl?: string;
  properties?: Typo3MediaProperties;
  cropVariants?: Record<string, Typo3CropVariant>;
  [key: string]: unknown;
}

export interface Typo3ContentElement {
  id: number | string;
  type: string;
  uid?: number;
  CType?: string;
  colPos?: number | string;
  content?: {
    header?: string;
    subheader?: string;
    bodytext?: string;
    html?: string;
    media?: Typo3File[];
    gallery?: {
      rows?: Record<string, { columns: Record<string, Typo3File> }> | any[];
    };
    searchConfig?: {
      placeholder?: string;
      collections?: string;
      enableAsk?: boolean;
    };
    ui?: {
      showAsk?: boolean;
    };
    animationSettings?: {
      animation: string;
      duration?: number;
      delay?: number;
      easing?: string;
      offset?: number;
      anchorPlacement?: string;
      once?: boolean;
    };
    [key: string]: any;
  };
  appearance?: {
    frameClass?: string;
    layout?: string;
    spaceBefore?: string;
    spaceAfter?: string;
    [key: string]: unknown;
  };
  _pixelcoda?: {
    uid?: number;
    pid?: number;
    ctype?: string;
    backendEditUrl?: string;
  };
  __colPos?: string;
  __index?: number;
  [key: string]: any;
}

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

export interface Typo3SearchResult {
  id: string | number;
  type: string;
  attributes?: {
    title?: string;
    abstract?: string;
    url?: string;
    type?: string;
    [key: string]: unknown;
  };
}

export interface Typo3SearchResponse {
  data: Typo3SearchResult[];
  meta?: {
    total?: number;
    total_pages?: number;
    pagination?: {
      pages?: string | number;
    };
    [key: string]: unknown;
  };
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
