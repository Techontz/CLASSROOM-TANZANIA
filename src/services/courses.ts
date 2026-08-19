import type { PastPaper, Subject, Topic } from "@/types";
import { SUBJECTS, findSubject, subjectName } from "@/data/subjects";
import { TOPICS, findTopic, topicsForSubject } from "@/data/topics";
import { PAST_PAPERS, findPaper, papersOfKind } from "@/data/past-papers";
import { DOWNLOADS } from "@/data/downloads";

// ---------------------------------------------------------------------------
// Course content (subjects, topics, past papers, downloads).
//
// MySQL is the source of truth. The whole published catalogue is fetched once
// at boot by src/content/store.ts and written into src/data, which is what
// these accessors read — so screens still get content synchronously, exactly as
// the original did, without a request per screen.
// ---------------------------------------------------------------------------

export async function listSubjects(): Promise<Subject[]> {
  return SUBJECTS;
}

export async function getSubject(subjectId: string): Promise<Subject | undefined> {
  return findSubject(subjectId);
}

export async function listTopics(subjectId: string): Promise<Topic[]> {
  return topicsForSubject(subjectId);
}

export async function getTopic(subjectId: string, topicId: string): Promise<Topic | undefined> {
  return findTopic(subjectId, topicId);
}

export async function listPapers(kind: PastPaper["kind"]): Promise<PastPaper[]> {
  return papersOfKind(kind);
}

export async function getPaper(paperId: string): Promise<PastPaper | undefined> {
  return findPaper(paperId);
}

// Synchronous accessors, for render paths that must not suspend.
export { SUBJECTS, TOPICS, PAST_PAPERS, DOWNLOADS, findSubject, subjectName, findPaper };
