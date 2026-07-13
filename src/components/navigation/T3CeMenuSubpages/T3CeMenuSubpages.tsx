// src/components/T3CeMenuPages.tsx

import React from "react";
import T3CeMenuPagesList from "../T3CeMenuPages/T3CeMenuPagesList";
import type { T3CeMenuPagesProps } from "@/types";

const T3CeMenuPages: React.FC<T3CeMenuPagesProps> = (props) => {
  return (
    <div className="t3-ce-menu">
      {props.menu && (
        <ul>
          {props.menu.map((menuItem, key) => (
            <li key={key}>
              <a
                href={menuItem.link}
                target={menuItem.target || undefined}
                title={menuItem.title}
              >
                {menuItem.title}
              </a>
              {menuItem.children && (
                <T3CeMenuPagesList items={menuItem.children || []} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default T3CeMenuPages;
