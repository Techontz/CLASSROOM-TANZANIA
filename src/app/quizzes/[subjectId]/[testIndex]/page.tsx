import RequireAuth from "@/components/layout/RequireAuth";
import QuizFlow from "@/components/quizzes/QuizFlow";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ subjectId: string; testIndex: string }>;
}) {
  const { subjectId, testIndex } = await params;
  const index = parseInt(testIndex, 10) || 0;
  return (
    <RequireAuth>
      <QuizFlow subjectId={subjectId} testIndex={index} />
    </RequireAuth>
  );
}
