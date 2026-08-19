"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useSession } from "./SessionProvider";
import LoadingScreen from "./LoadingScreen";

/**
 * Route gate. Mirrors the original session-restore logic: unauthenticated users
 * land on the login screen, and guardians are routed to their own dashboard
 * instead of the student app.
 */
export function RequireAuth({
  children,
  allow = "student",
}: {
  children: ReactNode;
  allow?: "student" | "guardian" | "any";
}) {
  const { authChecked, isAuthenticated, student } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!authChecked) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (allow === "student" && student.role === "guardian") {
      router.replace("/guardian");
      return;
    }
    if (allow === "guardian" && student.role !== "guardian") {
      router.replace("/dashboard");
    }
  }, [authChecked, isAuthenticated, student.role, allow, router]);

  if (!authChecked || !isAuthenticated) return <LoadingScreen />;
  if (allow === "student" && student.role === "guardian") return <LoadingScreen />;
  if (allow === "guardian" && student.role !== "guardian") return <LoadingScreen />;

  return <>{children}</>;
}

export default RequireAuth;
