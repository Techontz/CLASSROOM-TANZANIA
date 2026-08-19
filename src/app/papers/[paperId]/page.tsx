import RequireAuth from "@/components/layout/RequireAuth";
import PaperFlow from "@/components/quizzes/PaperFlow";

export default async function PaperPage({
  params,
}: {
  params: Promise<{ paperId: string }>;
}) {
  const { paperId } = await params;
  return (
    <RequireAuth>
      <PaperFlow paperId={paperId} />
    </RequireAuth>
  );
}
