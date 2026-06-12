// src/hooks/useT3CeBullets.ts

import { useMemo } from 'react';
import type { T3CeBulletsProps } from '@/types';

export const useT3CeBullets = (props: T3CeBulletsProps) => {
  const listTag = useMemo(() => {
    return props.bulletsType === 1 ? 'ol' : 'ul';
  }, [props.bulletsType]);

  const showBaseList = useMemo(() => {
    return props.bulletsType === 0 || props.bulletsType === 1;
  }, [props.bulletsType]);

  return { listTag, showBaseList };
};
