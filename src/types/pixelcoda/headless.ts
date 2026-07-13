import type { T3ContentElement } from '@/types';
import type { T3CeBaseProps } from '@/types/content';

export type PixelcodaGridPreset =
  | '12'
  | '6-6'
  | '4-4-4'
  | '3-3-3-3'
  | '8-4'
  | '4-8'
  | '9-3'
  | '3-9';

export type PixelcodaWidthPreset = 'narrow' | 'contained' | 'wide' | 'full';
export type PixelcodaGapPreset = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface PixelcodaResponsiveSettings {
  desktop?: { grid?: PixelcodaGridPreset | string };
  tablet?: { grid?: PixelcodaGridPreset | string };
  mobile?: { grid?: PixelcodaGridPreset | string };
}

export interface PixelcodaContainerColumn {
  name: string;
  colPos: number;
  label?: string;
  elements?: T3ContentElement<T3CeBaseProps>[];
}

export interface PixelcodaContainerMeta {
  identifier?: string;
  columns?: PixelcodaContainerColumn[];
}

export interface PixelcodaOrderSettings {
  desktop?: string[];
  tablet?: string[];
  mobile?: string[];
}

export interface PixelcodaSpacingSettings {
  gap?: PixelcodaGapPreset | string;
}

export interface PixelcodaLayoutMeta {
  identifier?: string;
  title?: string;
}

export interface PixelcodaHeadlessMeta {
  layout?: PixelcodaLayoutMeta;
  container?: PixelcodaContainerMeta;
  responsive?: PixelcodaResponsiveSettings;
  order?: PixelcodaOrderSettings;
  spacing?: PixelcodaSpacingSettings;
  width?: PixelcodaWidthPreset | string;
  preview?: boolean;
  devtools?: Record<string, unknown>;
}

export type PixelcodaAwareElement = T3ContentElement<T3CeBaseProps> & PixelcodaHeadlessMeta;
