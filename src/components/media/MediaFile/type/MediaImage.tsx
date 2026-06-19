// src/components/MediaImage.tsx

import React from 'react';
import Typo3Image from '@components/media/Typo3Image';
import type { T3File } from '@/types';
import { useMediaFile } from '../useMediaFile';
import T3Link from '@components/navigation/T3Link/T3Link';

interface MediaImageProps {
  file: T3File;
  className?: string;
  staticClass?: string;
  [key: string]: any;
}

const MediaImage: React.FC<MediaImageProps> = ({ file, className, staticClass, ...attrs }) => {
  const { hasLink } = useMediaFile(file);
  const WrapperComponent = hasLink ? T3Link : 'div';

  return (
    <div className={`t3-ce-media-image ${className || ''} ${staticClass || ''}`} {...attrs}>
      <WrapperComponent link={file.properties.linkData}>
        <figure>
          {file.publicUrl && (
            <Typo3Image
              src={file.publicUrl}
              width={file.properties.dimensions?.width || 800}
              height={file.properties.dimensions?.height || 600}
              alt={file.properties.alternative || ''}
              title={file.properties.title || ''}
              className="t3-ce-media-image__img"
              sizes="100vw"
              unoptimized={process.env.NODE_ENV !== 'production'}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
          {file.properties.description && (
            <figcaption>{file.properties.description}</figcaption>
          )}
        </figure>
      </WrapperComponent>
    </div>
  );
};

export default MediaImage;
