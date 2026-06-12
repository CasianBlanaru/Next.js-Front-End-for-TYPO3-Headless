const CACHE_NAME = 'typo3-headless-pwa-v2';
const ASSETS = ['/', '/icons/icon.svg', '/manifest.webmanifest'];

function shouldBypassCache(request) {
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return true;
  }

  if (url.searchParams.has('ADMCMD_prev') || url.searchParams.has('ADMCMD_view') || url.searchParams.has('preview') || url.searchParams.has('previewToken')) {
    return true;
  }

  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/headless') || url.pathname.startsWith('/typo3')) {
    return true;
  }

  if (url.pathname.endsWith('/sitemap.xml') || url.pathname.endsWith('/robots.txt')) {
    return true;
  }

  return false;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (shouldBypassCache(event.request)) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cachedResponse) => cachedResponse || caches.match('/')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      });
    })
  );
});
