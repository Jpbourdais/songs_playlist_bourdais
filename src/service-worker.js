workbox.setConfig({
  debug: false,
});

workbox.precaching.precacheAndRoute([
  '/',
  '/bundle.js',
  '/style.css',
  '/index.html',
  '/playlist',
  '/artist/0',
  '/artist/1',
  '/artist/2',
  '/artist/3',
  '/artist/4',
  '/artist/5',
  '/artist/6',
  '/manifest.json',
  '/img/icons/favicon-32x32.png',
  '/img/icons/favicon-16x16.png',
  '/img/icons/apple-icon-180x180-dunplab-manifest-21429.png',
  '/img/icons/android-icon-192x192-dunplab-manifest-21429.png',
  '/img/icons/apple-icon-152x152-dunplab-manifest-21429.png',
  '/img/icons/apple-icon-144x144-dunplab-manifest-21429.png',
  '/img/icons/apple-icon-120x120-dunplab-manifest-21429.png',
  '/img/icons/apple-icon-114x114-dunplab-manifest-21429.png',
  '/img/icons/favicon-96x96-dunplab-manifest-21429.png',
  '/img/icons/apple-icon-76x76-dunplab-manifest-21429.png',
  '/img/icons/apple-icon-72x72-dunplab-manifest-21429.png',
  '/img/icons/apple-icon-60x60-dunplab-manifest-21429.png',
  '/img/icons/apple-icon-57x57-dunplab-manifest-21429.png',
  '/img/icons/favicon-32x32-dunplab-manifest-21429.png',
  '/img/icons/favicon-16x16-dunplab-manifest-21429.png',
  'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  'https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/materialdesignicons-webfont.woff2?v=5.8.55'
]);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|js|css)$/,
  workbox.strategies.networkFirst({
    cacheName: 'assets',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://playlistsongs-8c2e7.firebaseio.com/musics.json'),
  workbox.strategies.networkFirst({
    cacheName: 'api',
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://playlistsongs-8c2e7.firebaseio.com/artists.json'),
  workbox.strategies.networkFirst({
    cacheName: 'api',
  }),
);

workbox.routing.registerRoute(
  /.*\.(jpeg|jpg|png)/,
  workbox.strategies.networkFirst({
    cacheName: 'images',
  }),
);

workbox.routing.registerRoute(
  /.*\.(css|js)/,
  workbox.strategies.cacheFirst({
    cacheName: 'assets-plus',
  }),
);

workbox.routing.registerRoute(
  /.*\.mp3/,
  workbox.strategies.networkFirst({
    cacheName: 'musics',
    plugins: [
      new workbox.rangeRequests.Plugin(),
    ],
    matchOptions: {
      ignoreSearch: true,
      ignoreVary: true
    }
  }),
);

var arrayMusic = [
  'https://playlistsongs-8c2e7.web.app/musiques/musique1.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique2.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique3.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique4.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique5.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique6.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique7.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique8.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique9.mp3',
]
    
workbox.precaching.precacheAndRoute(arrayMusic);