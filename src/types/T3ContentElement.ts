import type { T3Appearance } from './T3Appearance';
import type { T3CeBaseProps } from './content/T3CeBase';

export interface T3ContentElement<T extends T3CeBaseProps = T3CeBaseProps> {
  id: number;
  type: string;
  colPos?: number;
  categories?: string | string[];
  appearance: T3Appearance;
  content: T;
  [key: string]: unknown;
}
