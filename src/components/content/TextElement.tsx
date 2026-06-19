import React from "react";
import { T3CeBaseProps } from "@/types/content/index";

interface TextElementProps extends T3CeBaseProps {
    content: string;
}

const TextElement: React.FC<TextElementProps> = ({ content }) => {
    return <div className="text-element">{content}</div>;
};

export default TextElement;
