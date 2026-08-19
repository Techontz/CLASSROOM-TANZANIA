import RequireAuth from "@/components/layout/RequireAuth";
import AccountScreen from "@/components/profile/AccountScreen";

export default function ProfilePage() {
  return (
    <RequireAuth>
      <AccountScreen />
    </RequireAuth>
  );
}
