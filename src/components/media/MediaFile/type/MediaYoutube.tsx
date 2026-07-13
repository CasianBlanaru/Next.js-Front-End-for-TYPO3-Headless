import React from 'react';
import type { T3File } from '@/types';


export interface MediaYoutubeProps {
  file: T3File;
  className?: string;
  staticClass?: string;
  [key: string]: any; // Allow for additional attributes
}

const MediaYoutube: React.FC<MediaYoutubeProps> = ({ file, className, staticClass, ...attrs }) => {
  return (
    file.publicUrl ? (
      <iframe
        id={file.id.toString()}
        className="youtube-file"
        width={file.properties?.dimensions?.width || 640}
        height={file.properties?.dimensions?.height || 360}
        src={file.publicUrl}
        frameBorder="0"
        {...attrs}
      />
    ) : null
  );
};

export default MediaYoutube;
