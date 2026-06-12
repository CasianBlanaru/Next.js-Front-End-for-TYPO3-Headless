// src/components/MediaFile.tsx

import React from 'react';
import { useMediaFile } from './useMediaFile';
import type { T3File } from '@/types';

interface MediaFileProps {
  file: T3File;
}

const MediaFile: React.FC<MediaFileProps> = ({ file }) => {
  const { mediaTypeComponent: MediaTypeComponent } = useMediaFile(file);

  return MediaTypeComponent ? <MediaTypeComponent file={file} /> : null;
};

export default MediaFile;
