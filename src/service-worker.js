/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.setCacheNameDetails({prefix: "songplaylist"});

/*self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});*/

var CACHE_NAME = 'songplaylist-jp-cache';
/*var urlsToCache = [
  '/',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', function(event) {

  var cacheAllowlist = ['songplaylist-jp-cache'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});*/

/*self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(
          [
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
          ]
          );
      })
  );
});*/

/*self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
      })
  );
});*/

const filesToCache = [
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
];

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
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
        // TODO 5 - Respond with custom 404 page
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
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
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
