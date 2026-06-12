import React, { ReactNode } from "react";

interface CustomLayoutProps {
    children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
    return (
        <div>
            <header>
                <h1>Custom Frontend Layout</h1>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default CustomLayout;
