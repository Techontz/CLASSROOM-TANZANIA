// Education-level cascade. Values and formatting are unchanged from index.html.

export const SCHOOL_LEVELS = ["Standard 1-7", "Form 1-4", "Form 5-6"];
export const COLLEGE_OPTION = "College / University";
export const COLLEGE_STUDY_LEVELS = ["Certificate level", "Diploma level"];
export const COLLEGE_FACULTIES = [
  "Health courses",
  "Secretary course",
  "ICT course",
  "Early Childhood Education",
  "Accounting course",
];

/** Ported unchanged from index.html `composeLevel`. */
export function composeLevel(level: string, collegeLevel: string, faculty: string): string {
  if (level !== COLLEGE_OPTION) return level;
  return collegeLevel + " — " + faculty;
}

/** Ported unchanged from index.html `parseLevelString`. */
export function parseLevelString(level: string): { isCollege: boolean; faculty: string } {
  const parts = (level || "").split(" — ");
  if (parts.length === 2) {
    return { isCollege: true, faculty: parts[1] };
  }
  return { isCollege: false, faculty: "" };
}
