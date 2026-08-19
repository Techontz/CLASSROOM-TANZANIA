import RequireAuth from "@/components/layout/RequireAuth";
import SubjectDetailScreen from "@/components/learning/SubjectDetailScreen";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await params;
  return (
    <RequireAuth>
      <SubjectDetailScreen subjectId={subjectId} />
    </RequireAuth>
  );
}
