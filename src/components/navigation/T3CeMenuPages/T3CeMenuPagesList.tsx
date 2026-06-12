// src/components/T3CeMenuPagesList.tsx

import React from "react";

interface MenuItem {
  link: string;
  target?: string;
  title: string;
  children?: MenuItem[];
}

interface T3CeMenuPagesListProps {
  items: MenuItem[];
}

const T3CeMenuPagesList: React.FC<T3CeMenuPagesListProps> = ({ items }) => {
  return (
    <ul>
      {items.map((el, index) => (
        <li key={index}>
          <a href={el.link} target={el.target || undefined} title={el.title}>
            {el.title}
          </a>
          {el.children && <T3CeMenuPagesList items={el.children} />}
        </li>
      ))}
    </ul>
  );
};

export default T3CeMenuPagesList;
