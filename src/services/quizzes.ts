import type { QuizTest } from "@/types";
import { QUIZZES, testsForSubject } from "@/data/quizzes";

// ---------------------------------------------------------------------------
// Quizzes.
//
// Like course content, quizzes were hardcoded in the original frontend and are
// preserved that way. Async signatures leave room for a future content API.
// ---------------------------------------------------------------------------

export async function listTests(subjectId: string): Promise<QuizTest[]> {
  return testsForSubject(subjectId);
}

export async function getTest(subjectId: string, testIndex: number): Promise<QuizTest | undefined> {
  return testsForSubject(subjectId)[testIndex];
}

/** Ported from TrendingScreen's `resolveTestIndex`. */
export function resolveTestIndex(subjectId: string, testName: string): number {
  const tests = QUIZZES[subjectId] || [];
  const idx = tests.findIndex((t) => t.name === testName);
  return idx >= 0 ? idx : 0;
}

export { QUIZZES, testsForSubject };
