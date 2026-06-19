import React, { ReactNode } from "react";
import T3CeHeader from "@components/content/T3CeHeader/T3CeHeader";
import T3CeMenuPagesList from "./T3CeMenuPagesList";

interface MenuItem {
    link: string;
    target?: string;
    title: string;
    children?: MenuItem[];
}

interface T3CeMenuProps {
    menu: MenuItem[];
    children?: ReactNode;
}

const T3CeMenu: React.FC<T3CeMenuProps> = ({ menu, children }) => {
    return (
        <div className="t3-ce-menu">
            <T3CeHeader tableClass={""} tableTfoot={""} bodytext={[]} />
            {menu && (
                <ul>
                    {menu.map((menuItem, key) => (
                        <li key={key}>
                            <a
                                href={menuItem.link}
                                target={menuItem.target || undefined}
                                title={menuItem.title}
                            >
                                {menuItem.title}
                            </a>
                            <T3CeMenuPagesList
                                items={menuItem.children || []}
                            />
                        </li>
                    ))}
                </ul>
            )}
            {children}
        </div>
    );
};

export default T3CeMenu;
