import RequireAuth from "@/components/layout/RequireAuth";
import GuardianStudentDetailScreen from "@/components/guardian/GuardianStudentDetailScreen";

export default async function GuardianStudentPage({
  params,
  searchParams,
}: {
  params: Promise<{ studentId: string }>;
  searchParams: Promise<{ name?: string; level?: string }>;
}) {
  const { studentId } = await params;
  const { name, level } = await searchParams;
  return (
    <RequireAuth allow="guardian">
      <GuardianStudentDetailScreen
        studentId={studentId}
        studentName={name ?? "Student"}
        studentLevel={level ?? ""}
      />
    </RequireAuth>
  );
}
