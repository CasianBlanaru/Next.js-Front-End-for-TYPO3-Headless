import type { ReactNode } from 'react';
import {
  getGapClass,
  getResponsiveColumnSpan,
  getResponsiveGridClasses,
  getWidthClass,
} from '@/lib/pixelcoda';
import type {
  PixelcodaContainerColumn,
  PixelcodaGapPreset,
  PixelcodaOrderSettings,
  PixelcodaResponsiveSettings,
  PixelcodaWidthPreset,
} from '@/types/pixelcoda';

interface ResponsiveContainerProps {
  columns?: PixelcodaContainerColumn[];
  responsive?: PixelcodaResponsiveSettings;
  order?: PixelcodaOrderSettings;
  gap?: PixelcodaGapPreset | string;
  width?: PixelcodaWidthPreset | string;
  children: ReactNode;
}

function normalizeOrder(columns: PixelcodaContainerColumn[] = [], order?: PixelcodaOrderSettings) {
  const mobileOrder = order?.mobile;
  if (!mobileOrder?.length) return columns;

  const columnsByName = new Map(columns.map((column) => [column.name, column]));
  const ordered = mobileOrder
    .map((name) => columnsByName.get(name))
    .filter(Boolean) as PixelcodaContainerColumn[];
  const remaining = columns.filter((column) => !mobileOrder.includes(column.name));

  return [...ordered, ...remaining];
}

export default function ResponsiveContainer({
  columns = [],
  responsive,
  order,
  gap = 'md',
  width = 'contained',
  children,
}: ResponsiveContainerProps) {
  const orderedColumns = normalizeOrder(columns, order);
  const gridClasses = getResponsiveGridClasses(responsive);
  const widthClass = getWidthClass(width);
  const gapClass = getGapClass(gap);
  const desktopGrid = responsive?.desktop?.grid;

  return (
    <section
      className={`pixelcoda-responsive-container mx-auto w-full ${widthClass}`}
      data-pixelcoda-container="true"
      data-pixelcoda-width={width}
      data-pixelcoda-gap={gap}
      data-pixelcoda-desktop={responsive?.desktop?.grid ?? ''}
      data-pixelcoda-tablet={responsive?.tablet?.grid ?? ''}
      data-pixelcoda-mobile={responsive?.mobile?.grid ?? ''}
    >
      <div className={`grid ${gridClasses} ${gapClass}`}>
        {orderedColumns.length > 0
          ? orderedColumns.map((column, index) => (
              <div
                key={`${column.name}-${column.colPos}`}
                className={getResponsiveColumnSpan(desktopGrid, index)}
                data-pixelcoda-slot={column.name}
                data-pixelcoda-colpos={column.colPos}
              >
                {Array.isArray(children) ? children[index] : children}
              </div>
            ))
          : children}
      </div>
    </section>
  );
}
