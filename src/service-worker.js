var CACHE_NAME = 'songplaylist-jp-cache';

/*const filesToCache = [
  '/',
  '/bundle.js',
  '/style.css',
  '/index.html',
  '/css/app.b9f05576.css',
  '/css/chunk-12d3dbc3.fd0b3ae3.css',
  '/manifest.json',
  '/img/icons/favicon-32x32.png',
  '/img/icons/favicon-16x16.png',
  '/css/chunk-vendors.46cdbebe.css',
  '/css/chunk-637a29e2.fdedf6d2.css',
  '/img/icons/android-chrome-192x192.png',
  '/js/app.5652927c.js',
  '/css/chunk-a105c3b2.44369814.css',
  '/js/chunk-vendors.1054e158.js',
  'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  '/js/about.dd1c80d8.js',
  '/js/chunk-12d3dbc3.79d480cd.js',
  '/js/chunk-158f19e6.7dfad177.js',
  '/js/chunk-2d0aef49.b8acf5dd.js',
  '/js/chunk-637a29e2.99472fa6.js',
  '/js/chunk-a105c3b2.a01b99fc.js',
  'http://localhost:3000/musics/',
  'http://localhost:3000/artists/',
  'https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/materialdesignicons-webfont.woff2?v=5.8.55'
];*/

var filesToCache = [
  '/',
  '/bundle.js',
  '/style.css',
  '/index.html',
  '/manifest.json',
  '/img/icons/favicon-32x32.png',
  '/img/icons/favicon-16x16.png',
  '/img/icons/android-chrome-192x192.png',
  'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  'https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/materialdesignicons-webfont.woff2?v=5.8.55'
];

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      let musicsToCache = [];
      fetch("https://my-json-server.typicode.com/Jpbourdais/songs_playlist_bourdais/musics/")
        .then(response => response.json())
        .then(response => {
          response.forEach(element => musicsToCache.push('https://cors-anywhere.herokuapp.com/'+element.music))
        })
        .catch(error => console.log("Erreur : ",error));
      cache.addAll(musicsToCache);
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      .then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        }).catch(cache => {
          console.log(response, ' not in cache');
        });
      });

    }).catch(error => {
      // TODO 6 - Respond with custom offline page
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
