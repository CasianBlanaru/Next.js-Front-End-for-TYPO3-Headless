import type {
  PixelcodaGapPreset,
  PixelcodaResponsiveSettings,
  PixelcodaWidthPreset,
} from '@/types/pixelcoda';

const widthClasses: Record<string, string> = {
  narrow: 'max-w-3xl',
  contained: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-none',
};

const gapClasses: Record<string, string> = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

const gridColumns = (preset?: string): string => {
  switch (preset) {
    case '3-3-3-3':
      return 'grid-cols-4';
    case '4-4-4':
      return 'grid-cols-3';
    case '6':
    case '2-2-2-2-2-2':
      return 'grid-cols-6';
    case '6-6':
    case '8-4':
    case '4-8':
    case '9-3':
    case '3-9':
      return 'grid-cols-2';
    case '12':
    default:
      return 'grid-cols-1';
  }
};

export function getResponsiveGridClasses(responsive?: PixelcodaResponsiveSettings): string {
  const mobile = responsive?.mobile?.grid ?? '12';
  const tablet = responsive?.tablet?.grid ?? mobile;
  const desktop = responsive?.desktop?.grid ?? tablet;

  return [
    gridColumns(mobile),
    `md:${gridColumns(tablet)}`,
    `lg:${gridColumns(desktop)}`,
  ].join(' ');
}

export function getResponsiveColumnSpan(preset: string | undefined, index: number): string {
  if (!preset || preset === '12') return '';
  const parts = preset.split('-').map((value) => Number.parseInt(value, 10));
  const span = parts[index];
  if (!span || Number.isNaN(span)) return '';

  if (span >= 12) return 'col-span-full';
  if (span >= 9) return 'col-span-9';
  if (span >= 8) return 'col-span-8';
  if (span >= 6) return 'col-span-6';
  if (span >= 4) return 'col-span-4';
  if (span >= 3) return 'col-span-3';

  return '';
}

export function getWidthClass(width?: PixelcodaWidthPreset | string): string {
  return widthClasses[width ?? 'contained'] ?? widthClasses.contained;
}

export function getGapClass(gap?: PixelcodaGapPreset | string): string {
  return gapClasses[gap ?? 'md'] ?? gapClasses.md;
}
