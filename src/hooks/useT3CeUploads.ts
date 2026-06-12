import { useMemo } from 'react';
import { T3CeUploadsProps } from '../types/content';
import { T3File } from "@/types";

export const useT3CeUploads = () => {
  const getExtensionImg = (extension: string): string => {
    switch (extension.toLowerCase()) {
      case 'pdf':
        return '/icons/pdf-icon.png';
      case 'doc':
      case 'docx':
        return '/icons/doc-icon.png';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '/icons/image-icon.png';
      default:
        return '/icons/file-icon.png';
    }
  };

  const onError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = '/icons/file-icon.png';
  };

  return {
    getExtensionImg,
    onError,
  };
};
