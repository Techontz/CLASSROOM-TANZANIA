"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type {
  AppNotification,
  AttemptRecord,
  AuthPayload,
  Student,
} from "@/types";
import { parseLevelString } from "@/lib/level";
import * as authService from "@/services/auth";
import * as notificationsService from "@/services/notifications";
import { loadAttemptHistory } from "@/services/progress";
import { clearCatalogCache } from "@/content/store";

// ---------------------------------------------------------------------------
// Session + app-wide state.
//
// The original app held all of this in one `ClassroomTanzaniaApp` component
// alongside its `screen` string. Routing now lives in the App Router, so the
// state that outlived a screen change (student, attempt history, notifications)
// moved here. Behaviour is unchanged — the difference is that all of it now
// comes from the Laravel API rather than localStorage.
// ---------------------------------------------------------------------------

const EMPTY_STUDENT: Student = {
  name: "",
  level: "",
  isCollege: false,
  faculty: "",
  userId: null,
  avatarUrl: "",
  role: "student",
};

interface SessionContextValue {
  student: Student;
  authChecked: boolean;
  isAuthenticated: boolean;
  attemptHistory: AttemptRecord[];
  notifications: AppNotification[];
  unreadNotifCount: number;
  signIn: (payload: AuthPayload) => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  updateStudent: (updates: Partial<Student>) => void;
  addAttempt: (attempt: AttemptRecord) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

function studentFromPayload(payload: AuthPayload): Student {
  const parsed = parseLevelString(payload.level);
  return {
    name: payload.name,
    level: payload.level,
    isCollege: parsed.isCollege,
    faculty: parsed.faculty,
    userId: payload.userId,
    avatarUrl: payload.avatarUrl || "",
    role: payload.role,
  };
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student>(EMPTY_STUDENT);
  const [authChecked, setAuthChecked] = useState(false);
  const [attemptHistory, setAttemptHistory] = useState<AttemptRecord[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const hydrate = useCallback(async (payload: AuthPayload) => {
    setStudent(studentFromPayload(payload));
    if (payload.role === "guardian") return;
    const [history, notifs] = await Promise.all([
      loadAttemptHistory(),
      notificationsService.fetchNotifications(),
    ]);
    setAttemptHistory(history);
    setNotifications(notifs);
  }, []);

  // Restore an existing session on load: the stored bearer token is exchanged
  // for the current user, so a revoked or expired token signs the app out.
  useEffect(() => {
    let active = true;
    authService
      .getSession()
      .then(async (payload) => {
        if (!active) return;
        if (payload) await hydrate(payload);
      })
      .finally(() => {
        if (active) setAuthChecked(true);
      });
    return () => {
      active = false;
    };
  }, [hydrate]);

  const signIn = useCallback(
    async (payload: AuthPayload) => {
      await hydrate(payload);
    },
    [hydrate],
  );

  const reset = useCallback(() => {
    setStudent(EMPTY_STUDENT);
    setAttemptHistory([]);
    setNotifications([]);
    // The cached catalogue holds answer keys, so it does not outlive the session.
    clearCatalogCache();
  }, []);

  const signOut = useCallback(async () => {
    reset();
    await authService.signOut();
  }, [reset]);

  const deleteAccount = useCallback(async () => {
    reset();
    await authService.signOut();
  }, [reset]);

  const updateStudent = useCallback((updates: Partial<Student>) => {
    setStudent((prev) => ({ ...prev, ...updates }));
  }, []);

  const addAttempt = useCallback((attempt: AttemptRecord) => {
    setAttemptHistory((prev) => [...prev, attempt]);
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    notificationsService.markNotificationRead(id);
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    notificationsService.markAllNotificationsRead();
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      student,
      authChecked,
      isAuthenticated: Boolean(student.userId),
      attemptHistory,
      notifications,
      unreadNotifCount: notifications.filter((n) => !n.read).length,
      signIn,
      signOut,
      deleteAccount,
      updateStudent,
      addAttempt,
      markNotificationRead,
      markAllNotificationsRead,
    }),
    [
      student,
      authChecked,
      attemptHistory,
      notifications,
      signIn,
      signOut,
      deleteAccount,
      updateStudent,
      addAttempt,
      markNotificationRead,
      markAllNotificationsRead,
    ],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside <SessionProvider>");
  return ctx;
}

export default SessionProvider;
