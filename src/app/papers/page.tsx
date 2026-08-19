import RequireAuth from "@/components/layout/RequireAuth";
import PapersListScreen from "@/components/quizzes/PapersListScreen";

export default function PapersPage() {
  return (
    <RequireAuth>
      <PapersListScreen
        kind="pastPaper"
        heading="Past papers"
        sourceNote="Sourced from a publicly released NECTA Form Two National Assessment past paper."
      />
    </RequireAuth>
  );
}
