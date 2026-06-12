import type { T3Gallery } from '../T3Gallery';
import type { T3Appearance } from '../T3Appearance';
import type { T3Link } from '../T3Link';

export interface T3CeGalleryProps {
  gallery: T3Gallery;
  bodytext?: string | string[][];
  header?: string;
  headerLink?: T3Link | string;
  headerLayout?: number;
  headerPosition?: string;
  subheader?: string;
  appearance?: T3Appearance;
  className?: string;
  children?: React.ReactNode;
  tableClass: string;
  tableTfoot: string;
  tableHeaderPosition?: number;
}
