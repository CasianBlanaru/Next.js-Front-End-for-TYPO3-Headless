import React from 'react';
import type { T3File } from '@/types';

interface MediaAudioProps {
    file: T3File;
    className?: string;
    staticClass?: string;
    [key: string]: any;
}

const MediaAudio: React.FC<MediaAudioProps> = ({ file, className, staticClass, ...attrs }) => {
  return (
    file.publicUrl ? (
      <audio
        className={`t3-ce-media-audio ${className || ''} ${staticClass || ''}`}
        controls
        {...attrs}
      >
        <source src={file.publicUrl} type="audio/mp3" />
      </audio>
    ) : null
  );
};

export default MediaAudio;
