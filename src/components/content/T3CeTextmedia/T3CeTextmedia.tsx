import React from "react";
import T3CeTextpic from "../T3CeTextpic/T3CeTextpic";
import type { T3CeGalleryProps } from "@/types/content/index";

interface TextMediaWrapperProps extends T3CeGalleryProps {
    className?: string; // `className` als optionales Prop hinzufügen
}

const TextMediaWrapper: React.FC<TextMediaWrapperProps> = ({
    className,
    bodytext = [[]] as string[][] | string, // Ensure bodytext is always of type string[][] or string
    ...props
}) => {
    return (
        <T3CeTextpic
            {...props}
            tableHeaderPosition={props.tableHeaderPosition ?? 0}
            tableClass={props.tableClass ?? ""}
            tableTfoot={props.tableTfoot ?? ""}
            bodytext={typeof bodytext === "string" ? [[bodytext]] : bodytext}
            className={`t3-ce-textmedia ${className || ""}`}
        />
    );
};

export default TextMediaWrapper;
