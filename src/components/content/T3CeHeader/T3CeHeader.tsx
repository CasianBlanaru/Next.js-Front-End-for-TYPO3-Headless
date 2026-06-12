// components/T3CeHeader.tsx

import React from "react";
import { T3CeHeaderProps } from "@/types/content/T3CeHeader";
import Link from "next/link";

const T3CeHeader: React.FC<T3CeHeaderProps> = ({
    header,
    headerLayout,
    headerPosition,
    headerLink,
    subheader,
}) => {
    return (
        <header
            className={`t3-ce-header layout-${headerLayout} position-${headerPosition}`}
        >
            {headerLink ? (
                <Link
                    href={
                        typeof headerLink === "string"
                            ? headerLink
                            : headerLink.href
                    }
                    target={
                        typeof headerLink !== "string"
                            ? headerLink.target
                            : '_self'
                    }
                    title={
                        typeof headerLink !== "string"
                            ? headerLink.title
                            : undefined
                    }
                    className="inline-flex text-blue-600 hover:text-blue-800"
                >
                    <h2>{header}</h2>
                </Link>
            ) : (
                <h2>{header}</h2>
            )}
            {subheader && <h3>{subheader}</h3>}
        </header>
    );
};

export default T3CeHeader;
