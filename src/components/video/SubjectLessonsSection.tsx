"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { getCourse, listCourses } from "@/services/videos";
import type { Lesson } from "@/types";

/**
 * "Video lessons" section on the subject screen.
 *
 * Additive: it renders nothing at all when a subject has no published course,
 * so a subject without video looks exactly as it did before. Markup reuses the
 * existing topic-list / topic-card styling so it sits inside the screen rather
 * than beside it.
 */
export function SubjectLessonsSection({ subjectId }: { subjectId: string }) {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[] | null>(null);

  useEffect(() => {
    let active = true;

    listCourses(subjectId)
      .then(async (courses) => {
        if (!active || courses.length === 0) return null;
        return getCourse(courses[0].id);
      })
      .then((course) => {
        if (!active) return;
        setLessons(course?.lessons ?? []);
      })
      .catch(() => {
        if (active) setLessons([]);
      });

    return () => {
      active = false;
    };
  }, [subjectId]);

  // Nothing to show, or not loaded yet — render nothing rather than an empty
  // heading, so the screen never flashes a section that turns out to be blank.
  if (!lessons || lessons.length === 0) return null;

  return (
    <>
      <p className="section-title" style={{ margin: "18px 0 8px" }}>
        Video lessons
      </p>
      <div className="topic-list">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            className="topic-card"
            onClick={() => router.push(`/lessons/${lesson.id}`)}
          >
            <div>
              <p className="topic-title">
                {lesson.completed ? "✅ " : ""}
                {lesson.title}
              </p>
              <p className="topic-summary">
                {lesson.summary ||
                  `${lesson.videos?.length ?? 0} video${(lesson.videos?.length ?? 0) === 1 ? "" : "s"}`}
              </p>
            </div>
            <Icon name="chevronRight" size={16} />
          </button>
        ))}
      </div>
    </>
  );
}

export default SubjectLessonsSection;
