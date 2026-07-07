const cleanEnv = (val) => String(val || '').replace(/^['"]|['"]$/g, '');

export const siteConfig = {
  apiBaseUrl: cleanEnv(process.env.NEXT_PUBLIC_API_BASE_URL) || 'https://web-production-581b4.up.railway.app',
  typo3BaseUrl:
    cleanEnv(process.env.TYPO3_INTERNAL_URL) ||
    cleanEnv(process.env.NEXT_PUBLIC_TYPO3_BASE_URL) ||
    'https://web-production-581b4.up.railway.app',
  baseUrl: cleanEnv(process.env.NEXT_PUBLIC_BASE_URL) || 'https://nextjs-front-end-for-typo3-headless-production.up.railway.app',
  frontendFileApi: cleanEnv(process.env.NEXT_PUBLIC_FRONTEND_FILE_API) || '/fileadmin',
  searchApiBaseUrl: cleanEnv(process.env.NEXT_PUBLIC_SEARCH_API_BASE_URL) || 'https://web-production-581b4.up.railway.app/api/search',
  skin: cleanEnv(process.env.NEXT_PUBLIC_SKIN) || 'premium',
  devtools: cleanEnv(process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS) === 'true',
};
