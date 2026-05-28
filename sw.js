const CACHE='sanad-v13';
const BASE='/Sanad';
const ASSETS=[BASE+'/index.html',BASE+'/manifest.json',BASE+'/icon-192.png',BASE+'/icon-512.png'];
self.addEventListener('install',e=>{
  e.waitUntil(
    caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k))))
    .then(()=>caches.open(CACHE).then(c=>c.addAll(ASSETS)))
    .then(()=>self.skipWaiting())
  );
});
self.addEventListener('activate',e=>{
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('index.html')||e.request.url.endsWith('/Sanad/')){
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});