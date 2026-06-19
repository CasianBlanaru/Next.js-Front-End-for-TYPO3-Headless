// src/components/T3CeCodeBlock.tsx

import React from 'react';

interface T3CeCodeBlockProps {
  [key: string]: any;
}

const T3CeCodeBlock: React.FC<T3CeCodeBlockProps> = (props) => {
  return (
    <pre style={{ overflowX: 'scroll' }}>
      <code
        style={{
          fontSize: '12px',
          fontFamily:
            'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
        }}
      >
        {JSON.stringify(props, null, 2)}
      </code>
    </pre>
  );
};

export default T3CeCodeBlock;
