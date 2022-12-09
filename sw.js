// Note: sw.js needs to be in the root folder when using the default path "/"

let CACHE_NAME = "recode-pwa-boilerplate";

// Installing itself and using any existing cache.
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => cache.addAll(["./"]))
  );
});

// Here the service worker will intervene before the 
// browser goes looking on the web.
self.addEventListener("fetch", (e) => {
  // console.log(e.request.url); // this will show the SW is working
  e.respondWith(
    caches.match(e.request)
    .then((response) => response || fetch(e.request))
  );
});


// This will wait until the service worker is activated and 
// remove any existing old cache for the app.
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[ServiceWorker] Removing old cache", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

