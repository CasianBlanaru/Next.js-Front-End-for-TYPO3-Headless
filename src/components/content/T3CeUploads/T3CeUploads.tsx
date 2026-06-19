// src/components/T3CeUploads.tsx

import React from "react";
import Image from "next/image";
import type { T3CeUploadsProps } from "@/types/content/index";
import type { T3File } from "@/types";
import MediaFile from "@components/media/MediaFile/MediaFile";
import T3CeHeader from "@components/content/T3CeHeader/T3CeHeader";
import { useT3CeUploads } from "./useT3CeUploads";

const T3CeUploads: React.FC<T3CeUploadsProps> = (props) => {
  const { getExtensionImg, onError } = useT3CeUploads();

  return (
    <div className="t3-ce-uploads">
      {typeof props.header === "string" && <T3CeHeader tableClass={""} tableTfoot={""} bodytext={[]} {...props} header={props.header} />}
      {props.media && (
        <ul>
          {props.media.map((file: T3File, key: number) => (
            <li key={key}>
              <a
                href={file.publicUrl}
                target={props.target || "_self"}
                rel="noopener noreferrer"
              >
                {props.displayInformation === "1" && (
                  <span className="t3-ce-uploads__icon">
                    <Image
                      src={getExtensionImg(file.properties.mimeType)}
                      onError={onError}
                      alt=""
                      width={24}
                      height={24}
                      className="t3-ce-uploads__icon-img"
                    />
                  </span>
                )}
                {props.displayInformation === "2" &&
                  file.properties.type === "image" && (
                    <span className="t3-ce-uploads__thumb">
                      <MediaFile file={file} />
                    </span>
                  )}
                <span className="t3-ce-uploads__name">
                  {file.properties.title || file.publicUrl}
                </span>
                {props.displayFileSizeInformation && (
                  <span className="t3-ce-uploads__size">
                    {file.properties.size}
                  </span>
                )}
              </a>
              {props.displayDescription && file.properties.description && (
                <p className="t3-ce-uploads__desc">
                  {file.properties.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default T3CeUploads;
