import type { SyntheticEvent } from 'react';
import { useT3Options } from '@hooks/useT3Options';

export const useT3CeUploads = () => {
  const { currentSiteOptions } = useT3Options();
  const baseUrl = currentSiteOptions.api?.baseUrl || '';

  const getExtensionImg = (extension: string): string => {
    return `${baseUrl}/typo3/sysext/frontend/Resources/Public/Icons/FileIcons/${extension}.gif`;
  };

  const onError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const element = event.currentTarget;
    element.src = getExtensionImg('default');
  };

  return { getExtensionImg, onError };
};
