# Frontend Editing Integration for Next.js Headless

This integration enables TYPO3 Frontend Editing in the Next.js headless frontend.

## Setup

The integration consists of:

1. **FrontendEditor.jsx** - Loads TYPO3 editing assets
2. **EditableContent.jsx** - Provides React components with editing markers
3. **layout.jsx** - Includes FrontendEditor in the root layout

## Usage

### Wrapping Content Elements

```jsx
import { ContentElement, EditableHeadline, EditableBodytext } from '@/components/EditableContent';

export default function ContentCard({ content }) {
  return (
    <ContentElement uid={content.id} type={content.type}>
      <EditableHeadline uid={content.id} level="h2">
        {content.header}
      </EditableHeadline>
      
      <EditableBodytext uid={content.id}>
        {content.bodytext}
      </EditableBodytext>
    </ContentElement>
  );
}
```

### Custom Fields

```jsx
import { EditableContent } from '@/components/EditableContent';

<EditableContent 
  uid={content.id} 
  field="subheader" 
  className="lead"
>
  {content.subheader}
</EditableContent>
```

## How It Works

1. **Frontend loads** - FrontendEditor component checks for authenticated backend user
2. **Assets inject** - TYPO3 editing CSS and JS load from backend
3. **Markers detect** - Editor finds content via `data-pc-field`, `data-uid`, `data-field`
4. **Inline editing** - Click "Edit" button, modify text, autosave to TYPO3
5. **Drag & drop** - Reorder content elements within columns
6. **Image editing** - Opens TYPO3 contextual editor in side canvas
7. **AI assistant** - Optional AI rewriting with OpenAI/Claude/Mistral

## Backend Configuration

### Extension Setup

```bash
composer require pixelcoda/fe-editor:@dev
vendor/bin/typo3 extension:setup
vendor/bin/typo3 cache:flush
```

### AI Configuration (Optional)

Set environment variables:

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
```

Or configure in TYPO3 Backend:
```
Admin Tools > Settings > Extension Configuration > pixelcoda_fe_editor
```

### Disable for Users

```typoscript
# UserTSconfig
tx_pixelcodafeeditor.disabled = 1
```

## Requirements

- TYPO3 Backend user logged in
- User has `tt_content` edit permissions
- Content rendered from real `tt_content` records (not hardcoded)

## Markers

The extension detects editable fields via:

- **data-pc-field** - Pixelcoda marker (recommended)
- **data-table** - Database table name
- **data-uid** - Record UID
- **data-field** - Field name
- **id="c123"** - Standard TYPO3 content element ID
- **data-content-element-uid** - Alternative marker

## Troubleshooting

### Toolbar Not Visible
- Ensure backend user is logged in
- Check user has `tables_modify` for `tt_content`
- Flush TYPO3 caches

### Changes Not Persisting
- Verify content comes from database, not hardcoded Fluid
- Check browser console for errors
- Verify AJAX routes are accessible

### CORS Issues
Configure TYPO3 CORS headers for frontend domain in `.htaccess` or Nginx config.

## Production Deployment

For Railway:

1. Ensure backend URL is correct in `.env.local`
2. Build Next.js with `npm run build`
3. Backend must serve editor assets at `/typo3conf/ext/pixelcoda_fe_editor/Resources/Public/`
4. Configure CORS if frontend and backend on different domains
