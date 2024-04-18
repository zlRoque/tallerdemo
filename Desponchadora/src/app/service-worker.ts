const CACHE_NAME: string = 'AutoHelp';
const urlsToCache: string[] = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/scripts/main.js',
    '/app/assets/icon.png',
    '/app/assets/icon-256.png',
    '/app/assets/icon-512.png'
];

self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
    const cacheWhitelist: string[] = [CACHE_NAME];

    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            ))
    );
});
