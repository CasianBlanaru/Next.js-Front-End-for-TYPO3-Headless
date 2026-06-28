/**
 * Headless Content Wrapper Component
 * Adds Frontend Editor markers for TYPO3 Headless content
 */
export function EditableContent({ 
  uid, 
  table = 'tt_content', 
  field, 
  children, 
  className = '',
  ...props 
}) {
  // Only add markers if we have required data
  const markers = uid && field ? {
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
export function EditableHeadline({ uid, level = 'h2', children, className = '' }) {
  const Tag = level;
  
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
export function EditableBodytext({ uid, children, className = '' }) {
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
export function ContentElement({ uid, type, children, className = '' }) {
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
