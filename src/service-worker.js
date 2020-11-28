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
  '/img/icons/android-chrome-192x192.png',
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
    // This is needed since precached resources may
    // have a ?_WB_REVISION=... URL param.
    matchOptions: {
      ignoreSearch: true,
      ignoreVary: true
    }
  }),
);

/*fetch("https://my-json-server.typicode.com/Jpbourdais/songs_playlist_bourdais/musics/")
    .then(response => response.json())
    .then(response => {
      var arrayMusic = [];
      response.forEach(element => arrayMusic.push(element.music));
    })*/

var arrayMusic = [
  'https://playlistsongs-8c2e7.web.app/musiques/musique1.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique2.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique3.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique4.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique5.mp3',
  'https://playlistsongs-8c2e7.web.app/musiques/musique6.mp3',
]
    
workbox.precaching.precacheAndRoute(arrayMusic);

/*workbox.routing.registerRoute(
  new RegExp('https'),
  workbox.strategies.networkFirst({
    cacheName: 'musics',
    plugins: [
      new workbox.rangeRequests.Plugin(),
    ],
  })
);*/