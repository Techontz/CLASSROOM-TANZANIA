"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScreenHeader from "@/components/layout/ScreenHeader";
import VideoPlayer from "./VideoPlayer";
import { getLesson, markLessonComplete } from "@/services/videos";
import type { Lesson } from "@/types";

/** A single video lesson: the player, the notes, and a completion control. */
export function LessonScreen({ lessonId }: { lessonId: string }) {
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  const refresh = useCallback(async () => {
    const data = await getLesson(lessonId);
    setLesson(data);
    setLoading(false);
  }, [lessonId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleComplete() {
    if (!lesson) return;
    setCompleting(true);
    await markLessonComplete(lesson.id, !lesson.completed);
    await refresh();
    setCompleting(false);
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <ScreenHeader title="Lesson" onBack={() => router.back()} />
        <p className="footnote" style={{ padding: "16px" }}>
          Loading...
        </p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <ScreenHeader title="Lesson" onBack={() => router.back()} />
        <p className="footnote" style={{ padding: "16px" }}>
          This lesson isn&apos;t available yet.
        </p>
      </div>
    );
  }

  const videos = lesson.videos ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader title={lesson.title} onBack={() => router.back()} />

      <div style={{ padding: "4px 16px 20px", flex: 1, overflowY: "auto" }}>
        {videos.length === 0 && (
          <p className="footnote" style={{ textAlign: "left" }}>
            The video for this lesson is coming soon.
          </p>
        )}

        {videos.map((video) => (
          <div key={video.id} style={{ marginBottom: "14px" }}>
            <VideoPlayer video={video} />
            {video.progress && video.progress.percent > 0 && !video.progress.completed && (
              <p className="footnote" style={{ textAlign: "left", margin: "6px 0 0" }}>
                {video.progress.percent}% watched — picks up where you left off.
              </p>
            )}
          </div>
        ))}

        {lesson.summary && (
          <p className="topic-summary" style={{ margin: "0 0 10px" }}>
            {lesson.summary}
          </p>
        )}

        {lesson.content && <p className="topic-body">{lesson.content}</p>}
      </div>

      <div className="q-footer">
        <button className={lesson.completed ? "outline-btn" : "primary-btn"} disabled={completing} onClick={handleComplete}>
          {completing
            ? "Saving..."
            : lesson.completed
              ? "✅ Completed — mark as unwatched"
              : "Mark lesson complete"}
        </button>
      </div>
    </div>
  );
}

export default LessonScreen;
