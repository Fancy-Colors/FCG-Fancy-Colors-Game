/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable promise/catch-or-return */

const CACHE_NAME = 'fancy-colors-v1';

const URLS = [
  '/',
  '/profile',
  '/forum',
  '/howto',
  '/leaderboard',
  '/game/aleksa',
  '/game/minion',
  '/game/village',
  '/index.html',
  '/assets/css/index.css',
  '/assets/js/entry-server.js',
  '/assets/png/bg-image.png',
  '/assets/woff2/MontserratAlternates-Bold.woff2',
  '/assets/woff2/MontserratAlternates-Regular.woff2',
  '/vite.svg',
]; 

self.addEventListener('install', event => {
  const initCache = async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      return await cache.addAll(URLS);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('Installed');
  event.waitUntil(initCache());
});

self.addEventListener('activate', event => {
  const removeCacheKey = async () => {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames
        .filter(name => name !== CACHE_NAME)
        .map(name => caches.delete(name))
    )
  };

  console.log('Activated');
  event.waitUntil(removeCacheKey());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    tryNetwork(event.request, 400)
      .catch(() => getFromCache(event.request))
  );
});

function tryNetwork (request, timeout) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    // NOTE: https://github.com/w3c/ServiceWorker/issues/693
    const allowedMethods = ['GET', 'HEAD'];

    fetch(request).then(response => {
      clearTimeout(timeoutId);
      const responseClone = response.clone();
      
      caches.open(CACHE_NAME).then(cache => {
        if (request.url.match('^(http|https)://') && allowedMethods.includes(request.method)) { 
          cache.put(request, responseClone); 
        }
      })

      resolve(response);
    }, reject);
  });
};

async function getFromCache (request) {
  console.log('Интернета нет, данные взяты из кэша')
  
  const cache = await caches.open(CACHE_NAME);
  const result = await cache.match(request);
  
  return result || Promise.reject('no-match');
};
