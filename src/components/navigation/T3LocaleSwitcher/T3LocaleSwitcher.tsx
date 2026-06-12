// src/components/T3LocaleSwitcher.tsx

import React from 'react';
import useT3LocaleSwitcher from "./useT3LocaleSwitcher";
import Link from 'next/link';

const T3LocaleSwitcher: React.FC = () => {
  const { locales, currentCode } = useT3LocaleSwitcher();
  return (
    <div className="t3-locale-switcher">
      Current locale: {currentCode}
      {locales.map(({ title, link }) => (
        <Link key={title} href={link}>
          {title}
        </Link>
      ))}
    </div>
  );
};

export default T3LocaleSwitcher;
