import RequireAuth from "@/components/layout/RequireAuth";
import DownloadsScreen from "@/components/quizzes/DownloadsScreen";

export default function DownloadsPage() {
  return (
    <RequireAuth>
      <DownloadsScreen />
    </RequireAuth>
  );
}
