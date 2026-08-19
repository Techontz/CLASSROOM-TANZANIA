import RequireAuth from "@/components/layout/RequireAuth";
import PapersListScreen from "@/components/quizzes/PapersListScreen";

export default function MocksPage() {
  return (
    <RequireAuth>
      <PapersListScreen
        kind="mock"
        heading="Mock exams"
        sourceNote="Sourced from a regional mock examination, shared here for study purposes."
      />
    </RequireAuth>
  );
}
