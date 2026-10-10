const CACHE = "btc5m-scout-shell-v1";
const SHELL = ["./", "./index.html", "./manifest.json", "./icon.svg"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
  }
});