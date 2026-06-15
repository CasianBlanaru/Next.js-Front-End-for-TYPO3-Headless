import {
  getGapClass,
  getResponsiveColumnSpan,
  getResponsiveGridClasses,
  getWidthClass,
} from './responsive';

describe('pixelcoda responsive utilities', () => {
  it('maps column presets to grid classes', () => {
    expect(getResponsiveGridClasses({ mobile: { grid: '12' } })).toContain('grid-cols-1');
    expect(getResponsiveGridClasses({ mobile: { grid: '6-6' } })).toContain('grid-cols-2');
    expect(getResponsiveGridClasses({ mobile: { grid: '4-4-4' } })).toContain('grid-cols-3');
    expect(getResponsiveGridClasses({ mobile: { grid: '3-3-3-3' } })).toContain('grid-cols-4');
  });

  it('supports tablet and desktop breakpoints', () => {
    const classes = getResponsiveGridClasses({
      mobile: { grid: '12' },
      tablet: { grid: '6-6' },
      desktop: { grid: '4-4-4' },
    });

    expect(classes).toContain('grid-cols-1');
    expect(classes).toContain('md:grid-cols-2');
    expect(classes).toContain('lg:grid-cols-3');
  });

  it('resolves column spans for asymmetric layouts', () => {
    expect(getResponsiveColumnSpan('8-4', 0)).toBe('col-span-8');
    expect(getResponsiveColumnSpan('8-4', 1)).toBe('col-span-4');
    expect(getResponsiveColumnSpan('9-3', 0)).toBe('col-span-9');
    expect(getResponsiveColumnSpan('3-9', 1)).toBe('col-span-9');
  });

  it('returns width and gap presets', () => {
    expect(getWidthClass('narrow')).toBe('max-w-3xl');
    expect(getWidthClass('full')).toBe('max-w-none');
    expect(getGapClass('lg')).toBe('gap-8');
    expect(getGapClass()).toBe('gap-6');
  });
});
