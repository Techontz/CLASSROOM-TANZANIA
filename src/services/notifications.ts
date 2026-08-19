import type { AppNotification } from "@/types";
import { api } from "./api-client";

// ---------------------------------------------------------------------------
// Notifications.
//
// The original never let the client insert notifications — rows were created
// only by database triggers (welcome on signup, guardian linked). The API keeps
// that rule by exposing no create route at all: this service can only read and
// mark as read.
// ---------------------------------------------------------------------------

interface NotificationsResponse {
  notifications: AppNotification[];
  unreadCount: number;
}

/** GET /api/notifications */
export async function fetchNotifications(): Promise<AppNotification[]> {
  try {
    const result = await api.get<NotificationsResponse>("/notifications");
    return result.notifications;
  } catch {
    return [];
  }
}

/** POST /api/notifications/{notification}/read */
export function markNotificationRead(id: string): void {
  void api.post(`/notifications/${id}/read`).catch(() => {
    // The list is already updated optimistically; a failure is not fatal.
  });
}

/** POST /api/notifications/read-all */
export function markAllNotificationsRead(): void {
  void api.post("/notifications/read-all").catch(() => {
    // ignore
  });
}
