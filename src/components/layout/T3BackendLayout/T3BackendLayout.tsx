// src/components/T3BackendLayout/T3BackendLayout.tsx
import React from "react";

interface T3BackendLayoutProps {
    content: {
        colPos0: any[];
        [key: string]: any[];
    };
}

const T3BackendLayout: React.FC<T3BackendLayoutProps> = ({ content }) => {
    return (
        <div>
            {content.colPos0 ? (
                content.colPos0.map((item, index) => (
                    <div key={index}>{item.type}</div>
                ))
            ) : (
                <div>No Content Available</div>
            )}
        </div>
    );
};

export default T3BackendLayout;
