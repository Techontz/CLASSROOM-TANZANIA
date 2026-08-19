"use client";

import { useRouter } from "next/navigation";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { useSession } from "@/components/layout/SessionProvider";

/** Notifications list. Ported 1:1 from index.html `NotificationsScreen`. */
export function NotificationsScreen() {
  const router = useRouter();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useSession();
  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader title="Notifications" onBack={() => router.push("/dashboard")} />
      <div style={{ padding: "4px 16px 16px", flex: 1, overflowY: "auto" }}>
        {hasUnread && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
            <button className="link-btn" onClick={markAllNotificationsRead}>
              Mark all as read
            </button>
          </div>
        )}

        {notifications.length === 0 && (
          <p className="footnote" style={{ textAlign: "left" }}>
            No notifications yet.
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {notifications.map((n) => (
            <button
              key={n.id}
              className={"notification-card" + (n.read ? "" : " notification-unread")}
              onClick={() => !n.read && markNotificationRead(n.id)}
            >
              <p className="notification-title">{n.title}</p>
              {n.message && <p className="notification-message">{n.message}</p>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationsScreen;
