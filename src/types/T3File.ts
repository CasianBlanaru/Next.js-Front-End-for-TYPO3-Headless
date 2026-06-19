import type { T3Link } from './T3Link'

export interface T3File {
  id: number;
  url: string;
  publicUrl: string;
  title?: string;
  description?: string;
  locale?: string;
  properties: {
    linkData?: any;
    mimeType: string;
    link?: T3Link;
    type: string;
     size?: string;
    dimensions: {
      height: number;
      width: number;
    };
    alternative?: string;
    title?: string;
    description?: string;
  };
}

