// src/components/MediaVideo.tsx

import React from 'react';
import type { T3File } from '@/types';

interface MediaVideoProps {
  file: T3File;
  className?: string;
  staticClass?: string;
  [key: string]: any; // Allow for additional attributes
}

const MediaVideo: React.FC<MediaVideoProps> = ({ file, className, staticClass, ...attrs }) => {
  return (
    file.publicUrl ? (
      <video
        className={`t3-ce-media-video ${className || ''} ${staticClass || ''}`}
        controls
        {...attrs} // Spread any additional attributes
      >
        <source
          src={file.publicUrl}
          height={file.properties.dimensions.height}
          width={file.properties.dimensions.width}
          type={file.properties.mimeType}
        />
      </video>
    ) : null
  );
};

export default MediaVideo;
