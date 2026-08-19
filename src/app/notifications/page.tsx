import RequireAuth from "@/components/layout/RequireAuth";
import NotificationsScreen from "@/components/dashboard/NotificationsScreen";

export default function NotificationsPage() {
  return (
    <RequireAuth>
      <NotificationsScreen />
    </RequireAuth>
  );
}
