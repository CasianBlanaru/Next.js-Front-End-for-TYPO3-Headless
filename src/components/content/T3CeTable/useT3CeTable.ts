import { useMemo } from 'react';
import type { T3CeTableProps } from '@/types';

export type BodyTextType = string[][];

export const useT3CeTable = (props: T3CeTableProps) => {
  const thead = useMemo((): string[] => {
    return (
      (props.tableHeaderPosition === 1 &&
        [...(props.bodytext as BodyTextType)].shift()) ||
      []
    );
  }, [props.tableHeaderPosition, props.bodytext]);

  // Zuerst `tfoot` deklarieren
  const tfoot = useMemo((): string[] => {
    return (
      (props.tableTfoot === '1' &&
        [...(props.bodytext as BodyTextType)].pop()) ||
      []
    );
  }, [props.bodytext, props.tableTfoot]);

  // Dann `tbody` deklarieren
  const tbody = useMemo((): string[][] => {
    const tbody = [...(props.bodytext as BodyTextType)];
    if (thead.length) {
      tbody.shift();
    }
    if (tfoot.length) {
      tbody.pop();
    }
    return tbody;
  }, [props.bodytext, thead, tfoot]);

  return { thead, tbody, tfoot };
};
