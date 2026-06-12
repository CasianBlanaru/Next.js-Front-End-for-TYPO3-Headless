import { useMemo } from 'react';
import type { T3CeHeaderProps } from '../types/content';

export function useT3CeHeader(props: T3CeHeaderProps) {
  const headerLevel = useMemo(() => (props.headerLayout === 0 ? 1 : props.headerLayout || 1), [props.headerLayout]);
  const headerClass = useMemo(() => (props.headerPosition ? `t3-ce-header--${props.headerPosition}` : ''), [props.headerPosition]);

  return { headerLevel, headerClass };
}
