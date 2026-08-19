"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hashPathToRoute } from "@/lib/deep-links";

/**
 * Honours the original #hash deep-link format.
 *
 * Links shared before this migration (and every `deep_link` stored on a
 * bookmark) look like `/#topic/bio/b1`. This reads that hash on load and
 * forwards to the matching App Router path, so old links keep working.
 */
export function DeepLinkRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const route = hashPathToRoute(window.location.hash);
    if (!route) return;
    // Clear the hash so a later refresh doesn't bounce the user again.
    window.history.replaceState(null, "", window.location.pathname);
    router.replace(route);
  }, [router]);

  return null;
}

export default DeepLinkRedirect;
