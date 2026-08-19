// ---------------------------------------------------------------------------
// Classroom Tanzania — service worker.
//
// Adapted from the original single-file app's sw.js. The intent is unchanged
// (the app still opens offline), but the strategy had to change for Next.js:
//
// The original used cache-first for EVERY same-origin GET. That was correct
// when the whole app was one static index.html. With Next, an HTML document
// references build-specific JS chunks, so serving a stale cached document
// after a new deploy pairs old HTML with new chunks and the app fails to boot.
// React Server Component payloads (?_rsc=) go stale the same way.
//
// Strategy now:
//   • /_next/static/*        cache-first  (content-hashed, immutable)
//   • icons / manifest / PDFs cache-first  (stable public assets)
//   • navigations + RSC       network-first, falling back to cache when offline
//   • everything else         passthrough
// ---------------------------------------------------------------------------

const CACHE_NAME = "classroom-tanzania-v3";

// Minimal shell so the app can still open with no connection.
const APP_SHELL = [
  "/",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-maskable-192.png",
  "/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {}),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

/** Content-hashed build output — safe to serve from cache forever. */
function isImmutableAsset(url) {
  return url.pathname.startsWith("/_next/static/");
}

/** Stable files we ship in /public. */
function isPublicAsset(url) {
  return (
    url.pathname === "/manifest.json" ||
    /\.(png|jpg|jpeg|svg|ico|pdf|woff2?)$/i.test(url.pathname)
  );
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
  }
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Offline and this exact page was never cached — fall back to the shell.
    const shell = await caches.match("/");
    if (shell) return shell;
    throw err;
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // never intercept cross-origin

  if (isImmutableAsset(url) || isPublicAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Navigations and RSC payloads must always prefer the network.
  if (request.mode === "navigate" || url.searchParams.has("_rsc")) {
    event.respondWith(networkFirst(request));
  }
});
