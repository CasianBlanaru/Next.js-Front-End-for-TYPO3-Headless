import React from 'react';

/**
 * Headless Content Wrapper Component
 * Adds Frontend Editor markers for TYPO3 Headless content
 */
interface EditableContentProps extends React.HTMLAttributes<HTMLDivElement> {
  uid: number | string;
  table?: string;
  field: string;
  children?: React.ReactNode;
  className?: string;
}

export function EditableContent({ 
  uid, 
  table = 'tt_content', 
  field, 
  children, 
  className = '',
  ...props 
}: EditableContentProps) {
  // Only add markers if we have required data
  const markers: Record<string, any> = uid && field ? {
    'data-pc-field': '',
    'data-table': table,
    'data-uid': uid,
    'data-field': field,
  } : {};

  return (
    <div 
      className={className} 
      {...markers} 
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Editable Headline Component
 */
interface EditableHeadlineProps {
  uid: number | string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
}

export function EditableHeadline({ uid, level = 'h2', children, className = '' }: EditableHeadlineProps) {
  const Tag = level as any;
  
  return (
    <Tag
      className={className}
      data-pc-field=""
      data-table="tt_content"
      data-uid={uid}
      data-field="header"
    >
      {children}
    </Tag>
  );
}

/**
 * Editable Bodytext Component
 */
interface EditableBodytextProps {
  uid: number | string;
  children: React.ReactNode;
  className?: string;
}

export function EditableBodytext({ uid, children, className = '' }: EditableBodytextProps) {
  return (
    <div
      className={className}
      data-pc-field=""
      data-table="tt_content"
      data-uid={uid}
      data-field="bodytext"
      dangerouslySetInnerHTML={typeof children === 'string' ? { __html: children } : undefined}
    >
      {typeof children !== 'string' ? children : undefined}
    </div>
  );
}

/**
 * Content Element Wrapper
 * Wraps entire content elements with edit markers
 */
interface ContentElementWrapperProps {
  uid: number | string;
  type: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentElementWrapper({ uid, type, children, className = '' }: ContentElementWrapperProps) {
  return (
    <div 
      id={`c${uid}`}
      className={className}
      data-content-element-uid={uid}
      data-table="tt_content"
      data-uid={uid}
      data-ctype={type}
    >
      {children}
    </div>
  );
}
