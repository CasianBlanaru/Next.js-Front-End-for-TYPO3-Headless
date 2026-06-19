// src/components/T3CeTextpic.tsx

import React from 'react';
import T3MediaGallery from "../T3MediaGallery/T3MediaGallery";
import T3CeHeader from "@components/content/T3CeHeader/T3CeHeader";
import T3HtmlParser from '@components/ui/T3HtmlParser/T3HtmlParser';
import type { T3CeGalleryProps } from '@/types';

const T3CeTextpic: React.FC<T3CeGalleryProps> = (props) => {
  const { gallery, bodytext } = props;

  return (
    <div className="t3-ce-textpic">
      <T3MediaGallery gallery={gallery} tableHeaderPosition={0} tableClass={''} tableTfoot={''} bodytext={[]}>
        <T3CeHeader {...props} tableClass={props.tableClass ?? ""} tableTfoot={props.tableTfoot ?? ""} bodytext={Array.isArray(bodytext) ? bodytext : bodytext ? [[bodytext]] : []} />
        {bodytext && (
          Array.isArray(bodytext)
            ? <T3HtmlParser content={bodytext.flat().join(' ')} />
            : <T3HtmlParser content={bodytext} />
        )}
      </T3MediaGallery>
    </div>
  );
};

export default T3CeTextpic;
