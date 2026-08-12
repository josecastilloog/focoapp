// Foco - Service Worker
// Version: 1.0.0
// Estrategia: cache-first para funcionar sin conexión

const CACHE_NAME = 'foco-v4';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.png'
];

// Al instalar: precachea los archivos esenciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// Al activar: limpia versiones viejas del cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Al hacer fetch: intenta cache primero, luego red
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if(cached) return cached;
      return fetch(event.request).then(response => {
        // Solo cachear respuestas exitosas del mismo origen
        if(response && response.status === 200 && response.type === 'basic'){
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Si falla la red y no hay cache, devolvemos el index (SPA fallback)
        if(event.request.mode === 'navigate'){
          return caches.match('./index.html');
        }
      });
    })
  );
});

// Escuchar mensajes de la app (para notificaciones locales futuras)
self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SHOW_NOTIFICATION'){
    const { title, body, tag } = event.data.payload;
    self.registration.showNotification(title, {
      body,
      tag,
      icon: 'icon-192.png',
      badge: 'icon-192.png'
    });
  }
});

// Al hacer clic en una notificación: abrir/enfocar la app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      for(const client of clients){
        if('focus' in client) return client.focus();
      }
      if(self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
