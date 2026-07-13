// src/hooks/useMediaFile.ts

import { useMemo, type ComponentType } from 'react';
import MediaYoutube from './type/MediaYoutube';
import MediaVimeo from './type/MediaVimeo';
import MediaVideo from './type/MediaVideo';
import MediaAudio from './type/MediaAudio';
import MediaImage from './type/MediaImage';
import type { T3File } from '@/types';

export const useMediaFile = (file: T3File): {
  mediaTypeComponent: ComponentType<{ file: T3File; className?: string; staticClass?: string }>;
  hasLink: boolean;
} => {
  const mediaTypeComponent = useMemo(() => {
    switch (file.properties.type) {
      case 'video': {
        if (file.properties.mimeType.includes('youtube')) {
          return MediaYoutube;
        }
        if (file.properties.mimeType.includes('vimeo')) {
          return MediaVimeo;
        }
        return MediaVideo;
      }
      case 'audio':
        return MediaAudio;
      default:
        return MediaImage;
    }
  }, [file.properties.type, file.properties.mimeType]);

  const hasLink = useMemo(() => !!file.properties.link, [file.properties.link]);

  return {
    mediaTypeComponent,
    hasLink
  };
};
