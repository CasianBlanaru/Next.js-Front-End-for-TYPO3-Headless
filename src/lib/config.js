export const siteConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.typo3-inst.localhost/headless',
  typo3BaseUrl: process.env.NEXT_PUBLIC_TYPO3_BASE_URL || 'https://api.typo3-inst.localhost',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://typo3-inst.localhost',
  frontendFileApi: process.env.NEXT_PUBLIC_FRONTEND_FILE_API || '/headless/fileadmin',
  searchApiBaseUrl: process.env.NEXT_PUBLIC_SEARCH_API_BASE_URL || 'https://api.typo3-inst.localhost/api/search',
  skin: process.env.NEXT_PUBLIC_SKIN || 'premium',
  devtools: process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS === 'true',
};
