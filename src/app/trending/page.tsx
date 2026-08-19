import RequireAuth from "@/components/layout/RequireAuth";
import TrendingScreen from "@/components/dashboard/TrendingScreen";

export default function TrendingPage() {
  return (
    <RequireAuth>
      <TrendingScreen />
    </RequireAuth>
  );
}
