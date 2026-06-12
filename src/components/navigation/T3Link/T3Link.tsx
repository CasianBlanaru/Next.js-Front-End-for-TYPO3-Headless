// src/components/T3Link.tsx

import React from 'react';
import Link from 'next/link';
import type { T3Link as T3LinkType } from '@/types';

interface T3LinkProps {
  link: string | T3LinkType;
  children: React.ReactNode;
  additionalAttributes?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

const T3Link: React.FC<T3LinkProps> = ({ link, children, additionalAttributes }) => {
  const parsedLink = typeof link === 'string' ? { href: link } : link;

  return (
    <Link
      href={parsedLink.href}
      target={parsedLink.target}
      title={parsedLink.title}
      className={parsedLink.class}
      {...additionalAttributes}
    >
      {children}
    </Link>
  );
};

export default T3Link;
