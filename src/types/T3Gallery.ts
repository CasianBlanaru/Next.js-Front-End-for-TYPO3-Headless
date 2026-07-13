import type { T3File } from './T3File';

export interface T3Gallery {
  images: T3File[];
  position: {
    horizontal: 'left' | 'right' | 'center';
    vertical: 'above' | 'below' | 'intext';
    noWrap?: boolean;
  };
  count: {
    files: number;
  };
  rows: {
    [key: string]: {
      columns: {
        [key: string]: any;
      };
    };
  };
  width: number;
  columnSpacing: number;
  border: {
    enabled: boolean;
    width: number;
    padding: number;
  };
}
