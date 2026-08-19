import RequireAuth from "@/components/layout/RequireAuth";
import PerformanceScreen from "@/components/dashboard/PerformanceScreen";

export default function PerformancePage() {
  return (
    <RequireAuth>
      <PerformanceScreen />
    </RequireAuth>
  );
}
