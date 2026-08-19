"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/layout/LoadingScreen";
import DeepLinkRedirect from "@/components/layout/DeepLinkRedirect";
import { useSession } from "@/components/layout/SessionProvider";
import { parseShareHash } from "@/lib/deep-links";

/**
 * Entry point. Mirrors the original boot sequence: restore the session, then
 * land on the deep link if one was shared, otherwise Home (or the guardian
 * dashboard), otherwise the login screen.
 */
export default function RootPage() {
  const router = useRouter();
  const { authChecked, isAuthenticated, student } = useSession();

  useEffect(() => {
    if (!authChecked) return;
    // A #hash deep link is handled by <DeepLinkRedirect> once authenticated.
    const hasDeepLink =
      typeof window !== "undefined" && Boolean(parseShareHash(window.location.hash));

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (student.role === "guardian") {
      router.replace("/guardian");
      return;
    }
    if (!hasDeepLink) router.replace("/dashboard");
  }, [authChecked, isAuthenticated, student.role, router]);

  return (
    <>
      {isAuthenticated && <DeepLinkRedirect />}
      <LoadingScreen />
    </>
  );
}
