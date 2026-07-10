import { describe, it, expect, vi } from 'vitest';
import { normalizePath, normalizeMediaUrl, getBestImageUrl, normalizeContentColumns } from './typo3';

describe('typo3 lib', () => {
  describe('normalizePath', () => {
    it('should return / for empty input', () => {
      expect(normalizePath('')).toBe('/');
      expect(normalizePath([])).toBe('/');
      expect(normalizePath(undefined)).toBe('/');
    });

    it('should join array slug', () => {
      expect(normalizePath(['foo', 'bar'])).toBe('/foo/bar');
    });

    it('should prepend / to string slug if missing', () => {
      expect(normalizePath('foo/bar')).toBe('/foo/bar');
      expect(normalizePath('/foo/bar')).toBe('/foo/bar');
    });
  });

  describe('normalizeMediaUrl', () => {
    it('should return empty string for empty input', () => {
      expect(normalizeMediaUrl('')).toBe('');
      expect(normalizeMediaUrl(undefined)).toBe('');
    });

    it('should return absolute URLs as-is', () => {
      expect(normalizeMediaUrl('https://example.com/image.jpg')).toBe('https://example.com/image.jpg');
      expect(normalizeMediaUrl('data:image/png;base64,foo')).toBe('data:image/png;base64,foo');
    });

    it('should prepend base URL for relative paths', () => {
      // siteConfig.typo3BaseUrl defaults to 'https://web-production-581b4.up.railway.app' in tests if no env var
      const result = normalizeMediaUrl('/fileadmin/image.jpg');
      expect(result).toContain('http');
      expect(result).toContain('/fileadmin/image.jpg');
    });
  });

  describe('getBestImageUrl', () => {
    it('should return empty string for empty input', () => {
      expect(getBestImageUrl(null)).toBe('');
    });

    it('should prioritize cropVariants default publicUrl', () => {
      const file = {
        cropVariants: {
          default: { publicUrl: '/cropped.jpg' }
        },
        publicUrl: '/original.jpg'
      };
      expect(getBestImageUrl(file)).toBe('/cropped.jpg');
    });

    it('should fallback to publicUrl', () => {
      const file = {
        publicUrl: '/original.jpg'
      };
      expect(getBestImageUrl(file)).toBe('/original.jpg');
    });
  });

  describe('normalizeContentColumns', () => {
    it('should handle string content as html on colPos 0', () => {
      const result = normalizeContentColumns('Hello World');
      expect(result['0']).toBeDefined();
      expect(result['0'][0].type).toBe('html');
      expect(result['0'][0].content.bodytext).toBe('Hello World');
    });

    it('should handle array content as colPos 0', () => {
      const elements = [{ id: 1, type: 'text' }];
      const result = normalizeContentColumns(elements);
      expect(result['0']).toEqual(elements);
    });

    it('should normalize colPos names', () => {
      const content = {
        colPos1: [{ id: 1, type: 'text' }],
        '2': [{ id: 2, type: 'text' }]
      };
      const result = normalizeContentColumns(content);
      expect(result['1']).toBeDefined();
      expect(result['2']).toBeDefined();
    });
  });
});
