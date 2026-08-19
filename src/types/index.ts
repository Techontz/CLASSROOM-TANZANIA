// ---------------------------------------------------------------------------
// Domain types for the Classroom Tanzania frontend.
//
// These describe the shapes the UI works with. The service layer in
// src/services is responsible for producing them, so swapping the mock
// implementations for a real REST API means keeping these shapes and
// changing nothing else.
// ---------------------------------------------------------------------------

// ---------- Content ----------

export interface Subject {
  id: string;
  name: string;
  topics: number;
  emoji: string;
}

export interface Topic {
  id: string;
  title: string;
  summary: string;
  content: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

export interface QuizTest {
  /** Server-side identifier, used when submitting an attempt. */
  id: string;
  /** Subject this test belongs to. */
  subjectId: string;
  /** Zero-based position inside the subject — the index used in routes. */
  index: number;
  name: string;
  topic: string;
  questions: QuizQuestion[];
}

export interface PaperMcq {
  num: string;
  q: string;
  options: string[];
  correct: number;
}

export interface MatchingItem {
  id: string;
  label: string;
}

export interface PaperMatching {
  prompt: string;
  listA: MatchingItem[];
  listB: MatchingItem[];
  correct: Record<string, string>;
}

export interface PaperWritten {
  num: string;
  marks: number;
  prompt: string;
  model: string;
}

export interface PastPaper {
  id: string;
  kind: "pastPaper" | "mock";
  subject: string;
  title: string;
  year: number;
  board: string;
  duration: string;
  totalMarks: number;
  mcq: PaperMcq[];
  matching: PaperMatching;
  written: PaperWritten[];
}

export interface DownloadItem {
  id: string;
  subject: string;
  title: string;
  type: string;
  board: string;
  /** Filename served from /public when the PDF ships with the frontend. */
  file: string;
  /** Absolute URL, set once the PDF has been uploaded through the admin API. */
  url?: string | null;
}

export interface TermsSection {
  title: string;
  body: string;
}

// ---------- Identity ----------

export type UserRole = "student" | "guardian";

/** The authenticated user as the UI consumes it. */
export interface Student {
  name: string;
  level: string;
  isCollege: boolean;
  faculty: string;
  userId: string | null;
  avatarUrl: string;
  role: UserRole;
}

/** What a successful login/signup hands back to the app shell. */
export interface AuthPayload {
  userId: string;
  name: string;
  level: string;
  role: UserRole;
  avatarUrl?: string;
  email?: string;
}

export interface Profile {
  name: string;
  level: string;
  avatar_url: string | null;
  role: UserRole;
}

// ---------- Activity ----------

export interface AttemptRecord {
  id: string;
  kind: "quiz" | "paper";
  subjectId: string | null;
  subjectName: string;
  label: string;
  score: number;
  total: number;
  pct: number;
  durationMs: number;
  timestamp: number;
}

export interface QuizFinishPayload {
  /** Server-side quiz id, so the attempt can be submitted for marking. */
  quizId: string;
  /** Selected option per question, in question order; null means unanswered. */
  answers: (number | null)[];
  score: number;
  total: number;
  subjectId: string;
  subjectName: string;
  testName: string;
  testTopic: string;
  durationMs: number;
}

export interface PaperResponses {
  /** Selected option per MCQ, in paper order; null means unanswered. */
  mcq: (number | null)[];
  /** The matching answers as submitted, e.g. { i: "D", ii: "C" }. */
  matching: Record<string, string>;
  /** The student's own written answers, and whether they reviewed the model. */
  written: { text: string; reviewed: boolean }[];
}

export interface PaperFinishPayload {
  paperId: string;
  responses: PaperResponses;
  subject: string;
  title: string;
  year: number;
  mcqScore: number;
  mcqTotal: number;
  matchScore: number;
  matchTotal: number;
  reviewedCount: number;
  writtenTotal: number;
  durationMs: number;
}

// ---------- Bookmarks ----------

export type BookmarkType = "topic" | "practice_set" | "past_paper";

export interface Bookmark {
  id: string;
  user_id: string;
  type: BookmarkType;
  title: string;
  subtitle: string;
  subject_id: string | null;
  subject_name: string;
  deep_link: string;
  created_at: string;
  daysLeft: number;
}

// ---------- Notifications ----------

export interface AppNotification {
  id: string;
  title: string;
  message: string | null;
  read: boolean;
  created_at: string;
}

// ---------- Guardian access ----------

export type GuardianLinkStatus = "pending" | "active" | "revoked";

export interface GuardianLink {
  id: string;
  invite_code: string;
  relationship: string | null;
  status: GuardianLinkStatus;
  created_at: string;
  linked_at: string | null;
}

export interface LinkedStudent {
  linkId: string;
  relationship: string | null;
  studentId: string;
  name: string;
  level: string;
}

// ---------- Trending (cross-student analytics) ----------

export interface TopicPerformanceStat {
  subject_id: string | null;
  subject_name: string;
  topic: string;
  avg_pct: number;
  attempt_count: number;
}

export interface ImprovedTopicStat extends TopicPerformanceStat {
  this_week_pct: number;
  last_week_pct: number;
  delta: number;
}

export interface FailedQuestionStat {
  subject_id: string | null;
  subject_name: string;
  test_name: string;
  topic: string;
  question: string;
  wrong_count: number;
  total_count: number;
  wrong_pct: number;
}

export interface TrendingData {
  trending: TopicPerformanceStat[];
  challenging: TopicPerformanceStat[];
  improved: ImprovedTopicStat[];
  failedQuestions: FailedQuestionStat[];
}

// ---------- Video learning ----------

export type VideoProvider = "upload" | "url" | "youtube" | "vimeo";

export interface LessonVideo {
  id: string;
  title: string;
  provider: VideoProvider;
  /** Resolved playback URL: a file/CDN URL, or an embed URL for YouTube/Vimeo. */
  url: string;
  /** True when the player must be an <iframe> rather than a <video> element. */
  isEmbed: boolean;
  thumbnailUrl: string | null;
  durationSeconds: number;
  position: number;
  progress?: VideoProgress | null;
}

export interface VideoProgress {
  positionSeconds: number;
  percent: number;
  completed: boolean;
}

export interface Lesson {
  id: string;
  slug: string;
  courseId?: string;
  title: string;
  summary: string | null;
  content: string | null;
  position: number;
  videos?: LessonVideo[];
  completed?: boolean;
}

export interface Course {
  id: string;
  subjectId?: string | null;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  level: string | null;
  position: number;
  lessonCount?: number;
  lessons?: Lesson[];
}

// ---------- Deep links ----------

export type DeepLink =
  | { type: "subject"; subjectId: string }
  | { type: "topic"; subjectId: string; topicId: string }
  | { type: "quiz"; subjectId: string; testIndex: number }
  | { type: "paper"; paperId: string };

// ---------- Search ----------

export interface SearchItem {
  type: string;
  label: string;
  subLabel: string;
  subjectId?: string;
  topicId?: string;
  testIndex?: number;
  paperId?: string;
  haystack: string;
}

// ---------- Content catalogue ----------

/**
 * One payload holding every piece of published content, fetched once at boot.
 *
 * The UI reads content synchronously from module scope (the search index, the
 * subject grid, the quiz screen), so it is hydrated up front rather than fetched
 * per screen. See src/content/store.ts.
 */
export interface ContentCatalog {
  subjects: Subject[];
  subjectBadges: Record<string, string>;
  topics: Record<string, Topic[]>;
  quizzes: Record<string, QuizTest[]>;
  pastPapers: Record<string, PastPaper>;
  downloads: DownloadItem[];
  terms: TermsSection[];
  /** False for a signed-out catalogue, which withholds the answer keys. */
  includesAnswers: boolean;
}

/** Uniform result shape used by every service call, so error handling is consistent. */
export interface ServiceError {
  message: string;
}
