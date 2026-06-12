import React from "react";
import T3CeMenuPages from "../T3CeMenuPages/T3CeMenuPages";
import type { T3Link, MenuItem } from "@/types";

type T3Appearance = any;

interface T3CeMenuAbstractProps {
    menu: MenuItem[];
    link: T3Link;
    header?: string;
    headerLayout?: number;
    appearance?: T3Appearance;
    children?: ({ link }: { link: T3Link }) => React.ReactNode;
}

const T3CeMenuAbstract: React.FC<T3CeMenuAbstractProps> = ({
    children,
    ...props
}) => {
    return (
        <div className="t3-ce-menu-abstract">
            <T3CeMenuPages {...props}>
                {typeof children === "function"
                    ? children({ link: props.link })
                    : children}
            </T3CeMenuPages>
        </div>
    );
};

export default T3CeMenuAbstract;
