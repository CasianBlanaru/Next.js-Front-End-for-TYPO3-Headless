export default function TestPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Railway Test Page</h1>
      <p>This is a simple test page that does not depend on TYPO3 API.</p>
      <pre>{JSON.stringify({
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NEXT_PUBLIC_TYPO3_BASE_URL: process.env.NEXT_PUBLIC_TYPO3_BASE_URL,
      }, null, 2)}</pre>
    </main>
  );
}
