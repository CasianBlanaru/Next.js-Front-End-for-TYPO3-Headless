# @pixelcoda/headless-nextjs Frontend

Production-ready Next.js 16 frontend for TYPO3 Headless CMS with Server Components, visual editing, and GSAP animations.

## 🚀 Features

- **Next.js 16** with React 19 Server Components
- **TYPO3 Headless** integration via JSON API
- **Visual Editing** with frontend toolbar (`@pixelcoda/fe-editor`)
- **GSAP Animations** for content elements
- **Premium Skin System** with customizable themes
- **DevTools Overlay** for debugging (CMD/CTRL + SHIFT + H)
- **Railway Deployment** ready with optimized production build

## 📦 Installation

```bash
npm install
# or
yarn install
```

## 🔧 Configuration

Create `.env.local` from `.env.example`:

```env
# TYPO3 Backend API URL
NEXT_PUBLIC_API_BASE_URL=https://your-typo3-backend.com
NEXT_PUBLIC_TYPO3_BASE_URL=https://your-typo3-backend.com

# Frontend URL
NEXT_PUBLIC_BASE_URL=https://your-frontend.com

# File serving endpoint
NEXT_PUBLIC_FRONTEND_FILE_API=/fileadmin

# Optional: Enable DevTools overlay
NEXT_PUBLIC_HEADLESS_DEVTOOLS=true

# Optional: Skin selection
NEXT_PUBLIC_SKIN=premium
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.jsx              # Homepage
│   ├── suche/page.jsx        # Search page
│   └── [...slug]/page.jsx    # Dynamic TYPO3 pages
├── components/
│   ├── Renderer.jsx          # Content element renderer
│   ├── DevTools.jsx          # Debug overlay
│   └── ...
└── lib/
    ├── config.js             # Environment config
    └── typo3.js              # TYPO3 API utilities
```

## 🛠️ Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

### DevTools

Press **CMD + SHIFT + H** (macOS) or **CTRL + SHIFT + H** (Windows/Linux) to toggle the debug overlay when `NEXT_PUBLIC_HEADLESS_DEVTOOLS=true`.

## 🚢 Production

Build and start production server:

```bash
npm run build
npm start
```

## 📝 Content Rendering

The `Renderer` component automatically maps TYPO3 content elements to React components:

- `text`, `textpic`, `textmedia` → `TextElement`
- `pixelcodasearch_search` → `PixelcodaSearchElement`
- Custom types → Fallback to `TextElement`

### Example Content Element

```jsx
import { T3Frame } from '@pixelcoda/headless-nextjs';

export function TextElement({ element }) {
  const content = element.content || {};
  
  return (
    <T3Frame 
      id={`c${element.id}`} 
      frameClass={element.appearance?.frameClass}
    >
      <article>
        {content.header && <h2>{content.header}</h2>}
        {content.bodytext && (
          <div dangerouslySetInnerHTML={{ __html: content.bodytext }} />
        )}
      </article>
    </T3Frame>
  );
}
```

## 🔍 Search Integration

Built-in search page at `/suche` with:
- PixelCoda Search API integration
- AI-powered answers
- Faceted filtering
- Pagination

## 🎨 GSAP Animations

Content elements support GSAP scroll-triggered animations configured in TYPO3 backend via `pixelcoda/content-gsap-animation` extension.

## 🖼️ Image Handling

Images from TYPO3 are automatically served with:
- Lazy loading
- Responsive dimensions
- Alt text from TYPO3 metadata
- Gallery support with multiple columns

## 🔗 TYPO3 Requirements

### Required Extensions
- `friendsoftypo3/headless` ^5.0
- `pixelcoda/fe-editor` (optional, for visual editing)
- `pixelcoda/typo3-search` (optional, for search)
- `pixelcoda/content-gsap-animation` (optional, for animations)

### Site Configuration

Configure TYPO3 site in `config/sites/main/config.yaml`:

```yaml
base: 'https://your-frontend.com/'
rootPageId: 2
websiteTitle: 'Your Site'
```

### TypoScript Template

Create a TypoScript template on the root page with:
- Include: `Fluid Content Elements (fluid_styled_content)`
- Include: `Headless (headless)`

## 🚀 Deployment

### Railway

1. Connect GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to `main`

### Vercel / Netlify

1. Import repository
2. Configure environment variables
3. Build command: `npm run build`
4. Start command: `npm start`

## 📚 API Reference

### fetchPageData(path, searchParams, cookie)

Fetch TYPO3 page data:

```javascript
import { fetchPageData } from '../lib/typo3';

const page = await fetchPageData('/', null, cookie);
```

### normalizeMediaUrl(url)

Normalize TYPO3 media URLs:

```javascript
import { normalizeMediaUrl } from '../lib/typo3';

const imageUrl = normalizeMediaUrl(file.publicUrl);
```

### getBestImageUrl(file)

Extract best image URL from TYPO3 file object:

```javascript
import { getBestImageUrl } from '../lib/typo3';

const src = getBestImageUrl(file);
```

## 🐛 Troubleshooting

### "The requested page does not exist"
- Check `rootPageId` in TYPO3 site config
- Verify TypoScript template is configured
- Clear TYPO3 caches

### Images not loading
- Verify `NEXT_PUBLIC_TYPO3_BASE_URL` is correct
- Check TYPO3 fileadmin permissions
- Confirm images exist in `/fileadmin/`

### UTF-8 encoding issues
- Ensure TYPO3 database uses `utf8mb4` charset
- Check MySQL connection charset setting

## 📄 License

MIT

## 🔗 Links

- [TYPO3 Headless](https://github.com/TYPO3-Headless/headless)
- [@pixelcoda/headless-nextjs](https://www.npmjs.com/package/@pixelcoda/headless-nextjs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Demo Site](https://nextjs-front-end-for-typo3-headless-production.up.railway.app/)
