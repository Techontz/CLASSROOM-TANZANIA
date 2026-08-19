import type { AttemptRecord } from "@/types";
import { QUIZZES } from "@/data/quizzes";
import { SUBJECTS } from "@/data/subjects";

/** Performance band for a percentage. Ported unchanged from index.html `bandFor`. */
export function bandFor(pct: number): { label: string; cls: string } {
  if (pct >= 70) return { label: "Strong", cls: "band-strong" };
  if (pct >= 40) return { label: "Needs practice", cls: "band-mid" };
  return { label: "Needs attention", cls: "band-weak" };
}

/** Ported unchanged from index.html `formatDuration`. */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.round((ms || 0) / 1000));
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins === 0) return secs + "s";
  return mins + "m " + secs + "s";
}

/** Ported unchanged from index.html `formatTodayBadge`. */
export function formatTodayBadge(): { dayLabel: string; month: string; year: number } {
  const d = new Date();
  const day = d.getDate();
  const j = day % 10;
  const k = day % 100;
  let suffix = "th";
  if (j === 1 && k !== 11) suffix = "st";
  else if (j === 2 && k !== 12) suffix = "nd";
  else if (j === 3 && k !== 13) suffix = "rd";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return { dayLabel: day + suffix, month: months[d.getMonth()], year: d.getFullYear() };
}

/** Ported unchanged from index.html `computeSubjectProgress`. */
export function computeSubjectProgress(attemptHistory: AttemptRecord[]): Record<string, number> {
  const testsAttempted: Record<string, Set<string>> = {};
  attemptHistory.forEach((a) => {
    if (a.kind !== "quiz") return;
    const subj = SUBJECTS.find((s) => s.name === a.subjectName);
    if (!subj) return;
    if (!testsAttempted[subj.id]) testsAttempted[subj.id] = new Set();
    testsAttempted[subj.id].add(a.label);
  });
  const progress: Record<string, number> = {};
  Object.keys(testsAttempted).forEach((subjId) => {
    const totalTests = (QUIZZES[subjId] || []).length;
    progress[subjId] = totalTests > 0 ? Math.round((testsAttempted[subjId].size / totalTests) * 100) : 0;
  });
  return progress;
}

export interface ContinueCard {
  subjectId: string | null;
  subjectName: string;
  label: string;
  pct: number;
}

/** Ported unchanged from index.html `computeContinueCard`. */
export function computeContinueCard(attemptHistory: AttemptRecord[]): ContinueCard | null {
  const quizAttempts = attemptHistory.filter((a) => a.kind === "quiz");
  if (quizAttempts.length === 0) return null;
  const latest = quizAttempts[quizAttempts.length - 1];
  const subj = SUBJECTS.find((s) => s.name === latest.subjectName);
  return {
    subjectId: subj ? subj.id : null,
    subjectName: latest.subjectName,
    label: latest.label,
    pct: latest.pct,
  };
}

export const BOOKMARK_LIFETIME_DAYS = 30;

/** Ported unchanged from index.html `daysLeftFor`. */
export function daysLeftFor(createdAt: string): number {
  const created = new Date(createdAt).getTime();
  const expires = created + BOOKMARK_LIFETIME_DAYS * 24 * 60 * 60 * 1000;
  const msLeft = expires - Date.now();
  return Math.ceil(msLeft / (24 * 60 * 60 * 1000));
}

/** Ported unchanged from index.html `bandForDaysLeft`. */
export function bandForDaysLeft(days: number): { dot: string; cls: string } {
  if (days <= 7) return { dot: "🔴", cls: "band-weak" };
  if (days <= 20) return { dot: "🟡", cls: "band-mid" };
  return { dot: "🟢", cls: "band-strong" };
}
