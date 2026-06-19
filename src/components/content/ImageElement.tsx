// components/content/ImageElement.tsx

import React from "react";
import Image from "next/image";
import { T3CeBaseProps } from "@/types/content/index";

interface ImageElementProps extends T3CeBaseProps {
    src: string;
    alt?: string;
}

const ImageElement: React.FC<ImageElementProps> = ({ src, alt }) => {
    return (
        <Image
            src={src}
            alt={alt || "Bild"}
            width={800}
            height={600}
            sizes="100vw"
            className="image-element"
            style={{ width: '100%', height: 'auto' }}
        />
    );
};

export default ImageElement;
