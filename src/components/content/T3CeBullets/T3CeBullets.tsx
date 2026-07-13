import React from 'react';
import T3CeHeader from '@components/content/T3CeHeader/T3CeHeader';
import { useT3CeBullets } from './useT3CeBullets';
import type { T3CeBulletsProps } from '@/types';

const T3CeBullets: React.FC<T3CeBulletsProps> = ({
  bodytext = [],
  bulletsType = 0,
  header,
  tableHeaderPosition = 0,
  tableClass = 'default-class',
  tableTfoot = '0',
  ...props
}) => {
  const { listTag, showBaseList } = useT3CeBullets({ bodytext, bulletsType });

  return (
    <div className="t3-ce-bullets">
      {header && (
        <T3CeHeader
          headerPosition={tableHeaderPosition.toString()}
          tableClass={tableClass}
          tableTfoot={tableTfoot}
          bodytext={bodytext as string[][]}
          {...props}
        />
      )}
      {showBaseList ? (
        React.createElement(
          listTag,
          {},
          bodytext.map((el, i) => <li key={i}>{el}</li>)
        )
      ) : (
        <dl>
          {bodytext.map((el, i) => (
            <React.Fragment key={`${i}-0`}>
              <dt>{el[0]}</dt>
              <dt>{el[0]}</dt>
              {el[1] && <dd key={`${i}-1`}>{el[1]}</dd>}
            </React.Fragment>
          ))}
        </dl>
      )}
    </div>
  );
};

export default T3CeBullets;
