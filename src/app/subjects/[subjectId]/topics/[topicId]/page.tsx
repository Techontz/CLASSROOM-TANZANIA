import RequireAuth from "@/components/layout/RequireAuth";
import TopicDetailScreen from "@/components/learning/TopicDetailScreen";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ subjectId: string; topicId: string }>;
}) {
  const { subjectId, topicId } = await params;
  return (
    <RequireAuth>
      <TopicDetailScreen subjectId={subjectId} topicId={topicId} />
    </RequireAuth>
  );
}
