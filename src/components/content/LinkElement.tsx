import React from "react";
import Link from "next/link";
import { T3Link } from "@/types";

interface T3LinkComponentProps {
    link: string | T3Link;
    children?: React.ReactNode;
}

const T3LinkComponent: React.FC<T3LinkComponentProps> = ({
    link,
    children,
}) => {
    const parsedLink: T3Link = typeof link === "string" ? { href: link } : link;

    const {
        href,
        target,
        title,
        class: className,
        additionalAttributes,
    } = parsedLink;

    return (
        <Link href={href} target={target} title={title} className={className} {...(additionalAttributes || {})}>
            {children}
        </Link>
    );
};

export default T3LinkComponent;
