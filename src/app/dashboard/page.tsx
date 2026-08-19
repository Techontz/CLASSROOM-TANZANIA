import RequireAuth from "@/components/layout/RequireAuth";
import HomeScreen from "@/components/dashboard/HomeScreen";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <HomeScreen />
    </RequireAuth>
  );
}
