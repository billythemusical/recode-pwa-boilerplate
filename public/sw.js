let CACHE_NAME = 'd4w-store'

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
      '/'
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  // console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
        }))
      })
      .then(() => self.clients.claim())
  )
})