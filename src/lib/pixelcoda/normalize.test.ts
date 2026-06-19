import { getColumnElements, getPixelcodaMeta } from './normalize';

describe('pixelcoda normalize utilities', () => {
  it('returns empty metadata when source is missing', () => {
    expect(getPixelcodaMeta()).toEqual({});
    expect(getPixelcodaMeta(null)).toEqual({});
  });

  it('merges pixelcoda and headless metadata with graceful defaults', () => {
    const meta = getPixelcodaMeta({
      pixelcoda: {
        width: 'wide',
        container: { columns: [{ name: 'main', colPos: 0 }] },
      },
      headless: {
        responsive: { desktop: { grid: '6-6' } },
      },
    });

    expect(meta.width).toBe('wide');
    expect(meta.container?.columns).toHaveLength(1);
    expect(meta.responsive?.desktop?.grid).toBe('6-6');
  });

  it('resolves column elements by colPos with fallback keys', () => {
    const content = {
      colPos0: [{ id: 1 }],
      '1': [{ id: 2 }],
    };

    expect(getColumnElements(content as any, { name: 'main', colPos: 0 })).toHaveLength(1);
    expect(getColumnElements(content as any, { name: 'side', colPos: 1 })).toHaveLength(1);
    expect(getColumnElements(undefined, { name: 'empty', colPos: 9 })).toEqual([]);
  });
});
