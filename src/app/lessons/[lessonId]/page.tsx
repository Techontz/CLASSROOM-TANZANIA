import RequireAuth from "@/components/layout/RequireAuth";
import LessonScreen from "@/components/video/LessonScreen";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  return (
    <RequireAuth>
      <LessonScreen lessonId={lessonId} />
    </RequireAuth>
  );
}
