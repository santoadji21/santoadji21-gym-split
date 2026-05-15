const CACHE_NAME = 'gym-split-app-shell';
const LEGACY_CACHE_PREFIX = 'gym-split-cache-';
const APP_SHELL = ['/', '/index.html', '/manifest.webmanifest', '/launchericon-192x192.png', '/launchericon-512x512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key.startsWith(LEGACY_CACHE_PREFIX))
          .map((key) => caches.delete(key))
      );

      const cache = await caches.open(CACHE_NAME);
      const requests = await cache.keys();

      await Promise.all(
        requests
          .filter((request) => {
            const url = new URL(request.url);
            return !APP_SHELL.includes(url.pathname);
          })
          .map((request) => cache.delete(request))
      );
    })()
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/', responseClone));
          return response;
        })
        .catch(() => caches.match('/') || caches.match('/index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          if (requestUrl.origin === self.location.origin) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => caches.match('/index.html'));
    })
  );
});
