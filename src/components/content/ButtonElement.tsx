// components/content/ButtonElement.tsx

import React from "react";
import Link from "next/link";
import { T3CeBaseProps } from "@/types/content/index";

interface ButtonElementProps extends T3CeBaseProps {
    text: string;
    href: string;
    target?: string;
}

const ButtonElement: React.FC<ButtonElementProps> = ({
    text,
    href,
    target = "_self",
}) => {
    return (
        <Link
            href={href}
            target={target}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
            {text}
        </Link>
    );
};

export default ButtonElement;
