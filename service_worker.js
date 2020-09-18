const cache_name = 'rishabh_v1';


const cache_assets = [
  'index.html',
  '/css/bootstrap.min.css',
  '/css/style.css',
  '/css/fontawesome.min.css',
  'imgs/slide1.jpg',
  '/js/bootstrap.min.js',
  '/js/jquery-3.3.1.min.js',
  '/js/main.js'
]

// Install Service Worker
self.addEventListener('install', e => {
  console.log('Service Worker Installed Yipeee');

  // Commenting for caching specific assets
  // e.waitUntil(
  //   caches.open(cache_name)
  //     .then(cache => {
  //       console.log('Service Worker Caching Files');
  //       return cache.addAll(cache_assets);
  //     })
  //     .then(() => self.skipWaiting())
  //     .catch(e => console.log(e))
  // )
})

// Call Activate Event

self.addEventListener('activate', e => {
  console.log('Service Worker Activated');

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache != cache_name) {
              console.log("Deleting old Cache");
              return caches.delete(cache);
            }
          })
        )
      })
  )
})

// Fetch Event

self.addEventListener('fetch', e => {
  console.log('Fetch Event');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const response = res.clone();
        caches.open(cache_name)
          .then(cache => {
            cache.put(e.request, response)
          });
          return res;
      })
      .catch(() => caches.match(e.request).then(res => res))
    )
})