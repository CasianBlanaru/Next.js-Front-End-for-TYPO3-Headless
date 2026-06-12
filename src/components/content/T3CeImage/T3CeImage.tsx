import React from "react";
import T3CeHeader from "@components/content/T3CeHeader/T3CeHeader";
import T3MediaGallery from "../T3MediaGallery/T3MediaGallery";
import type { T3CeImageProps } from "@/types/content/index";

const T3CeImage: React.FC<T3CeImageProps> = (props) => {
  return (
    <div className="t3-ce-image">
      <T3MediaGallery
        gallery={props.gallery}
        tableHeaderPosition={
          typeof props.headerPosition === "string"
            ? parseInt(props.headerPosition, 10)
            : props.headerPosition ?? 0
        }
        tableClass={props.tableClass}
        tableTfoot={props.tableTfoot}
        bodytext={props.bodytext}
      />
      <T3CeHeader
        header={props.header}
        subheader={props.subheader}
        tableClass={props.tableClass}
        tableTfoot={props.tableTfoot}
        bodytext={props.bodytext}
      />
    </div>
  );
};

export default T3CeImage;
