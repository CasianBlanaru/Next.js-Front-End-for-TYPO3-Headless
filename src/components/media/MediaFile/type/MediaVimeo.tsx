// src/components/MediaVimeo.tsx

import React from "react";
import type { T3File } from "@/types";

interface MediaVimeoProps
    extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    file: T3File;
    className?: string;
    staticClass?: string;
}

const MediaVimeo: React.FC<MediaVimeoProps> = ({
    file,
    className,
    staticClass,
    ...attrs
}) => {
    return (
        <iframe
            {...attrs}
            className={`t3-ce-media-video t3-ce-media-vimeo ${
                className || ""
            } ${staticClass || ""}`}
            src={file.publicUrl}
            width={file.properties.dimensions.width || 640}
            height={file.properties.dimensions.height || 360}
            title={file.properties.title || ""}
            frameBorder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen
        />
    );
};

export default MediaVimeo;
