import type { Course, Lesson } from "@/types";
import { api } from "./api-client";

// ---------------------------------------------------------------------------
// Video learning.
//
// Courses and lessons sit alongside the existing Subject → Topic → Quiz model
// rather than replacing it: a course optionally belongs to a subject, so the
// two structures share subjects without either depending on the other.
//
// The API returns a resolved playback URL per video. Uploaded files resolve to
// a URL on the storage disk (local /storage in development, S3 / R2 / a CDN in
// production), so video bytes never pass through the API server.
// ---------------------------------------------------------------------------

/** GET /api/courses?subject=... */
export async function listCourses(subjectId?: string): Promise<Course[]> {
  try {
    const query = subjectId ? `?subject=${encodeURIComponent(subjectId)}` : "";
    return await api.get<Course[]>(`/courses${query}`);
  } catch {
    return [];
  }
}

/** GET /api/courses/{course} — includes lessons, videos and this student's progress. */
export async function getCourse(courseId: string): Promise<Course | null> {
  try {
    return await api.get<Course>(`/courses/${courseId}`);
  } catch {
    return null;
  }
}

/** GET /api/lessons/{lesson} */
export async function getLesson(lessonId: string): Promise<Lesson | null> {
  try {
    return await api.get<Lesson>(`/lessons/${lessonId}`);
  } catch {
    return null;
  }
}

/**
 * POST /api/videos/{video}/progress
 *
 * Called as the player reports position. Once a video has been watched through
 * it stays watched, so scrubbing back to review does not undo the lesson.
 */
export async function saveVideoProgress(
  videoId: string,
  positionSeconds: number,
  durationSeconds: number,
  completed = false,
): Promise<{ percent: number; completed: boolean } | null> {
  try {
    return await api.post<{ positionSeconds: number; percent: number; completed: boolean }>(
      `/videos/${videoId}/progress`,
      {
        position_seconds: Math.max(0, Math.round(positionSeconds)),
        duration_seconds: Math.max(0, Math.round(durationSeconds)),
        completed,
      },
    );
  } catch {
    return null;
  }
}

/** POST /api/lessons/{lesson}/progress */
export async function markLessonComplete(lessonId: string, completed = true): Promise<void> {
  try {
    await api.post(`/lessons/${lessonId}/progress`, { completed });
  } catch {
    // Progress saving must never interrupt playback.
  }
}
