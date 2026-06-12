import React from "react";
import T3Renderer from "@components/layout/T3Renderer/T3Renderer";
import type { T3BackendLayout } from "@/types";

const T3BlDefault: React.FC<T3BackendLayout> = ({ content }) => {
    return content?.colPos0 ? <T3Renderer content={content.colPos0} /> : null;
};

export default T3BlDefault;
