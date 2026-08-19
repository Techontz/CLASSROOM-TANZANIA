import RequireAuth from "@/components/layout/RequireAuth";
import GuardianDashboardScreen from "@/components/guardian/GuardianDashboardScreen";

export default function GuardianPage() {
  return (
    <RequireAuth allow="guardian">
      <GuardianDashboardScreen />
    </RequireAuth>
  );
}
