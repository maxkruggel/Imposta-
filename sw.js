const CACHE = 'impostor-v11';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      // cache:'reload' umgeht den HTTP-Browsercache – sonst landet beim
      // Update eine bis zu 10 Minuten alte Startseite erneut im SW-Cache
      .then(c => Promise.allSettled(CORE.map(u => c.add(new Request(u, {cache:'reload'})))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Seitenaufrufe: Netz zuerst (Updates greifen sofort), Cache als Offline-Fallback
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => {
          c.put('./index.html', copy.clone()).catch(() => {});
          c.put('./', copy).catch(() => {});
        }).catch(() => {});
        return res;
      }).catch(() =>
        caches.match('./index.html', {ignoreSearch: true})
          .then(hit => hit || caches.match('./', {ignoreSearch: true}))
      )
    );
    return;
  }

  // Alles andere (Icons, Fonts, Bilder): Cache zuerst, Netz füllt nach
  e.respondWith(
    caches.match(e.request, {ignoreSearch: true}).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
