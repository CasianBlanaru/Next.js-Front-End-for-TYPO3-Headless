import React from 'react';
import type {
  T3AppearanceSpace,
  T3AppearanceFrameClass,
} from '@/types/T3Appearance';

interface T3FrameProps {
  id?: string;
  frameClass?: T3AppearanceFrameClass;
  layout?: string;
  spaceBefore?: T3AppearanceSpace;
  spaceAfter?: T3AppearanceSpace;
  background?: string;
  children?: React.ReactNode;
}

const T3Frame: React.FC<T3FrameProps> = ({
  id,
  frameClass = 'default',
  layout = 'default',
  spaceBefore,
  spaceAfter,
  background,
  children,
}) => {
  const classes = [
    't3-ce-frame',
    `frame-${frameClass || 'default'}`,
    `layout-${layout || 'default'}`,
    `space-before-${spaceBefore || 'default'}`,
    `space-after-${spaceAfter || 'default'}`,
    background ? `bg-${background}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div id={id} className={classes}>
      {children}
    </div>
  );
};

export default T3Frame;