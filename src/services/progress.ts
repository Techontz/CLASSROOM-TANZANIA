import type {
  AttemptRecord,
  PaperFinishPayload,
  QuizFinishPayload,
  TrendingData,
} from "@/types";
import { api } from "./api-client";

// ---------------------------------------------------------------------------
// Progress, attempts and cross-student analytics.
//
// Attempts are marked and stored server-side: the client sends the answers, and
// the API returns the recorded attempt. Nothing here trusts a score computed in
// the browser, and nothing here is kept in localStorage.
// ---------------------------------------------------------------------------

/** GET /api/attempts — quiz and paper attempts merged, oldest first. */
export async function loadAttemptHistory(): Promise<AttemptRecord[]> {
  try {
    return await api.get<AttemptRecord[]>("/attempts");
  } catch {
    return [];
  }
}

/** GET /api/guardian/students/{student}/attempts */
export async function loadStudentAttemptHistory(studentId: string): Promise<AttemptRecord[]> {
  try {
    return await api.get<AttemptRecord[]>(`/guardian/students/${studentId}/attempts`);
  } catch {
    return [];
  }
}

/**
 * POST /api/quizzes/{quiz}/attempts
 *
 * `answers` is one entry per question in question order; null means the student
 * left it blank. The score in the returned record is the server's.
 */
export async function submitQuizAttempt(
  quizId: string,
  answers: (number | null)[],
  durationMs: number,
): Promise<AttemptRecord | null> {
  try {
    return await api.post<AttemptRecord>(`/quizzes/${quizId}/attempts`, {
      answers,
      duration_ms: durationMs,
    });
  } catch {
    // A failed save must never block the results screen.
    return null;
  }
}

export interface PaperAttemptResult extends Omit<PaperFinishPayload, "paperId" | "subject" | "title" | "year" | "durationMs"> {
  attempt: AttemptRecord;
}

/** POST /api/past-papers/{paper}/attempts */
export async function submitPaperAttempt(
  paperId: string,
  payload: {
    mcq: (number | null)[];
    matching: Record<string, string>;
    written: { text: string; reviewed: boolean }[];
    durationMs: number;
  },
): Promise<PaperAttemptResult | null> {
  try {
    return await api.post<PaperAttemptResult>(`/past-papers/${paperId}/attempts`, {
      mcq: payload.mcq,
      matching: payload.matching,
      written: payload.written,
      duration_ms: payload.durationMs,
    });
  } catch {
    return null;
  }
}

/** POST /api/subjects/{subject}/topics/{topic}/progress */
export async function saveTopicProgress(subjectId: string, topicId: string): Promise<void> {
  try {
    await api.post(`/subjects/${subjectId}/topics/${topicId}/progress`);
  } catch {
    // Saving progress must never break the app if it fails.
  }
}

/** GET /api/progress/topics — topic slug to the time it was last read. */
export async function loadTopicProgress(): Promise<Record<string, string>> {
  try {
    return await api.get<Record<string, string>>("/progress/topics");
  } catch {
    return {};
  }
}

export interface ProgressOverview {
  quizAttempts: number;
  paperAttempts: number;
  totalScore: number;
  totalQuestions: number;
  accuracy: number;
  topicsRead: number;
  lessonsCompleted: number;
  videosCompleted: number;
  subjects: Record<string, number>;
  continueLearning: {
    subjectId: string | null;
    subjectName: string;
    label: string;
    pct: number;
  } | null;
}

/** GET /api/progress */
export async function loadProgressOverview(): Promise<ProgressOverview | null> {
  try {
    return await api.get<ProgressOverview>("/progress");
  } catch {
    return null;
  }
}

/** GET /api/progress/subjects/{subject} */
export async function loadSubjectProgress(subjectId: string): Promise<unknown | null> {
  try {
    return await api.get(`/progress/subjects/${subjectId}`);
  } catch {
    return null;
  }
}

/**
 * POST /api/question-responses
 *
 * One row per answered subject-test question, written the moment the student
 * locks an answer in — including tests they never finish. This is what the
 * Trending aggregates are built from. Whether the answer was right is decided
 * by the server against the stored key.
 */
export function logQuestionResponse(
  quizId: string,
  position: number,
  selectedIndex: number,
): void {
  void api
    .post("/question-responses", {
      quiz: quizId,
      position,
      selected_index: selectedIndex,
    })
    .catch(() => {
      // Fire and forget: analytics must never interrupt a test.
    });
}

/** GET /api/trending — aggregates across all students, never individual data. */
export async function loadTrendingData(): Promise<TrendingData> {
  try {
    return await api.get<TrendingData>("/trending");
  } catch {
    return { trending: [], challenging: [], improved: [], failedQuestions: [] };
  }
}

export type { QuizFinishPayload };
