import type { T3CeHeaderProps } from './T3CeHeaderProps';
import type { T3Gallery } from '../T3Gallery';

export interface T3CeImageProps extends T3CeHeaderProps {
  gallery: T3Gallery;
  header?: string;
  subheader?: string;
  tableClass: string;
  tableTfoot: string;
  bodytext: string[][];
  className?: string;

}
