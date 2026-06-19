// src/hooks/useT3CeHeader.ts

import { useMemo } from 'react';
import type { T3CeHeaderProps } from '@/types/content';

/**
 * Provides headerLevel and headerClass computed values based on provided props
 * @param props
 */
export function useT3CeHeader(props: T3CeHeaderProps) {
  // By default, if type is 0, set header level to 1
  const headerLevel = useMemo(() => {
    return props.headerLayout === 0 ? 1 : props.headerLayout || 1;
  }, [props.headerLayout]);

  // Apply default class name
  const headerClass = useMemo(() => {
    return props.headerPosition ? `t3-ce-header--${props.headerPosition}` : '';
  }, [props.headerPosition]);

  return { headerLevel, headerClass };
}
