// Minimal service worker for PWA registration only
// No caching - just enables PWA installation

self.addEventListener('install', (event) => {
  console.log('Magna Coders PWA: Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Magna Coders PWA: Service Worker activated');
});

// Allow all network requests to pass through
self.addEventListener('fetch', (event) => {
  // No caching - let browser handle all requests normally
  return;
});