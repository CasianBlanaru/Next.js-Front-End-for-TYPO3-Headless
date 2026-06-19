import { useMemo } from 'react';
import type { T3I18N } from '@/types';

const useT3LocaleSwitcher = () => {
  const locales = useMemo(() => [] as T3I18N[], []);
  return {
    locales,
    currentCode: 'en',
    currentLocale: null,
  };
};

export default useT3LocaleSwitcher;
