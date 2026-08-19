"use client";

import { useEffect } from "react";

/**
 * PWA service worker registration.
 *
 * Two deliberate differences from the original index.html registration:
 *
 *  1. Production only. In development Next serves un-hashed, constantly
 *     changing chunks over HMR; a service worker sitting in front of that
 *     causes stale-asset boot failures.
 *  2. No auto-reload on `controllerchange`. The original reloaded the page the
 *     moment a new worker took control, which was the fix for a stale
 *     single-file app. With Next the new worker also claims the page on its
 *     very first install, so that listener fires a reload on every user's first
 *     visit. The updated sw.js is network-first for documents, so a new deploy
 *     is picked up on the next navigation without needing a forced reload.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    if (!(location.protocol === "https:" || location.hostname === "localhost")) return;

    navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).catch(() => {});
  }, []);

  return null;
}

export default ServiceWorkerRegistrar;
