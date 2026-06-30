import './globals.css';

export const metadata = {
  title: 'PixelCoda TYPO3 Headless Frontend',
  description: 'Next.js frontend for TYPO3 Headless powered by PixelCoda.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
