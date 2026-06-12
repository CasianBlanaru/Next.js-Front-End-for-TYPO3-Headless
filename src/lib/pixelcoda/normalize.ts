import type { T3ContentElement } from '@/types';
import type { T3CeBaseProps } from '@/types/content';
import type { PixelcodaContainerColumn, PixelcodaHeadlessMeta } from '@/types/pixelcoda';

export function getPixelcodaMeta(source?: Record<string, unknown> | null): PixelcodaHeadlessMeta {
  if (!source) return {};

  const pixelcoda = source.pixelcoda as PixelcodaHeadlessMeta | undefined;
  const headless = source.headless as PixelcodaHeadlessMeta | undefined;

  return {
    ...(headless ?? {}),
    ...(pixelcoda ?? {}),
    layout: (pixelcoda?.layout ?? headless?.layout ?? source.layout) as PixelcodaHeadlessMeta['layout'],
    container: (pixelcoda?.container ?? headless?.container ?? source.container) as PixelcodaHeadlessMeta['container'],
    responsive: (pixelcoda?.responsive ?? headless?.responsive ?? source.responsive) as PixelcodaHeadlessMeta['responsive'],
    order: (pixelcoda?.order ?? headless?.order ?? source.order) as PixelcodaHeadlessMeta['order'],
    spacing: (pixelcoda?.spacing ?? headless?.spacing ?? source.spacing) as PixelcodaHeadlessMeta['spacing'],
    width: (pixelcoda?.width ?? headless?.width ?? source.width) as PixelcodaHeadlessMeta['width'],
    preview: Boolean(pixelcoda?.preview ?? headless?.preview ?? source.preview),
  };
}

export function getColumnElements(
  pageContent: Record<string, T3ContentElement<T3CeBaseProps>[]> | undefined,
  column: PixelcodaContainerColumn,
): T3ContentElement<T3CeBaseProps>[] {
  if (Array.isArray(column.elements)) return column.elements;
  const colPosKey = `colPos${column.colPos}`;
  return pageContent?.[colPosKey] ?? pageContent?.[String(column.colPos)] ?? [];
}
