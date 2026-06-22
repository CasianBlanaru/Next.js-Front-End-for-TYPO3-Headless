const cleanEnv = (val) => String(val || '').replace(/^['"]|['"]$/g, '');

export const siteConfig = {
  apiBaseUrl: cleanEnv(process.env.NEXT_PUBLIC_API_BASE_URL) || 'https://api.typo3-inst.localhost/headless',
  typo3BaseUrl: cleanEnv(process.env.NEXT_PUBLIC_TYPO3_BASE_URL) || 'https://api.typo3-inst.localhost',
  baseUrl: cleanEnv(process.env.NEXT_PUBLIC_BASE_URL) || 'https://typo3-inst.localhost',
  frontendFileApi: cleanEnv(process.env.NEXT_PUBLIC_FRONTEND_FILE_API) || '/headless/fileadmin',
  searchApiBaseUrl: cleanEnv(process.env.NEXT_PUBLIC_SEARCH_API_BASE_URL) || 'https://api.typo3-inst.localhost/api/search',
  skin: cleanEnv(process.env.NEXT_PUBLIC_SKIN) || 'premium',
  devtools: cleanEnv(process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS) === 'true',
};
