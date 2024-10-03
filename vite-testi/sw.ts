/// <reference lib="webworker" />

// Cache name and files to cache
const CACHE_NAME = 'restaurant-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './main.html',
  './index.js',
  './style.css', // Ensure the path matches where the file is actually located in dist
  './main.js', // Transpiled file path
  'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js', // Add any additional assets here
];

// Explicitly type `self` as `ServiceWorkerGlobalScope`
const swSelf = self as unknown as ServiceWorkerGlobalScope;

// Install Service Worker
swSelf.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
  console.log('Service Worker Installed');
});

// Cache and return requests
swSelf.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update Service Worker
swSelf.addEventListener('activate', (event: ExtendableEvent) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
