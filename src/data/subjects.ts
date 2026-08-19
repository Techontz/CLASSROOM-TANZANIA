import type { Subject } from "@/types";

/**
 * Extracted verbatim from the original index.html (SUBJECTS).
 *
 * MySQL is now the source of truth for this content: these literals are the
 * offline fallback the app boots from, and src/content/store.ts replaces them
 * with the API's catalogue before the first screen renders. The exports are
 * `let` so importers see the hydrated values through the live binding.
 */
export const SEED_SUBJECTS: Subject[] = [{
  id: "math",
  name: "Mathematics",
  topics: 12,
  emoji: "\u2796"
}, {
  id: "eng",
  name: "English",
  topics: 8,
  emoji: "\uD83D\uDCD6"
}, {
  id: "kisw",
  name: "Kiswahili",
  topics: 7,
  emoji: "\uD83D\uDCD7"
}, {
  id: "bio",
  name: "Biology",
  topics: 10,
  emoji: "\uD83E\uDDEC"
}, {
  id: "chem",
  name: "Chemistry",
  topics: 9,
  emoji: "\uD83E\uDDEA"
}, {
  id: "phy",
  name: "Physics",
  topics: 9,
  emoji: "\u269B\uFE0F"
}, {
  id: "hist",
  name: "History",
  topics: 6,
  emoji: "\uD83C\uDFDB\uFE0F"
}, {
  id: "civ",
  name: "Civics",
  topics: 6,
  emoji: "\uD83C\uDF0D"
}, {
  id: "rel",
  name: "Religion",
  topics: 5,
  emoji: "\uD83D\uDD4A\uFE0F"
}, {
  id: "acc",
  name: "Accounting",
  topics: 3,
  emoji: "\uD83D\uDCB0"
}];


export const SEED_SUBJECT_BADGE_BG: Record<string, string> = {
  math: "#0f172a",
  eng: "#e0f2fe",
  kisw: "#dcfce7",
  bio: "#fce7f3",
  chem: "#dcfce7",
  phy: "#f3e8ff",
  hist: "#fef3c7",
  civ: "#dbeafe",
  rel: "#f1f5f9",
  acc: "#fef9c3"
};

export let SUBJECTS: Subject[] = SEED_SUBJECTS;
export let SUBJECT_BADGE_BG: Record<string, string> = SEED_SUBJECT_BADGE_BG;

/** Called by the content store once the catalogue has been fetched. */
export function setSubjects(subjects: Subject[], badges: Record<string, string>): void {
  SUBJECTS = subjects;
  SUBJECT_BADGE_BG = { ...SEED_SUBJECT_BADGE_BG, ...badges };
}

export function findSubject(subjectId: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === subjectId);
}

export function subjectName(subjectId: string | null | undefined): string {
  if (!subjectId) return "";
  return findSubject(subjectId)?.name ?? "";
}
