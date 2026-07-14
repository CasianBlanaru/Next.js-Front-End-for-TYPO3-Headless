# How to add a custom Content Element Type (CType)

To extend the TYPO3 Headless frontend with your own content elements, follow this guide.

## 1. Create your React component
Create a new file in `src/components/MyCustomElement.tsx`:

```tsx
import React from 'react';
import { Typo3ContentElement } from '../types/typo3';
import { ContentElement } from './ContentElement';

interface Props {
  element: Typo3ContentElement;
}

export const MyCustomElement = ({ element }: Props) => {
  const { header, bodytext } = element.content || {};

  return (
    <ContentElement content={element.content}>
      <section className="my-custom-element">
        {header && <h2>{header}</h2>}
        <div dangerouslySetInnerHTML={{ __html: bodytext || '' }} />
      </section>
    </ContentElement>
  );
};
```

## 2. Register the component in the Renderer
Open `src/components/Renderer.tsx` and add your CType to the `rendererComponents` mapping:

```tsx
import { MyCustomElement } from './MyCustomElement';

// ... inside renderElement logic or rendererComponents map
export const rendererComponents = {
  // ... existing mappings
  my_extension_ctype: MyCustomElement,
};
```

## 3. Verify in TYPO3
Ensure your TYPO3 backend is configured to export the new CType via `ext:headless`. Once the JSON API returns the CType, the Next.js frontend will automatically use your new component.
