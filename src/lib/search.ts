import type { SearchItem } from "@/types";
import { SUBJECTS } from "@/data/subjects";
import { TOPICS } from "@/data/topics";
import { QUIZZES } from "@/data/quizzes";
import { PAST_PAPERS } from "@/data/past-papers";

/**
 * Builds the global search index over all content.
 * Ported unchanged from index.html `buildSearchIndex`.
 */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  SUBJECTS.forEach((s) => {
    items.push({
      type: "Subject",
      label: s.name,
      subLabel: s.topics + " topics · tap to open",
      subjectId: s.id,
      haystack: s.name.toLowerCase(),
    });
  });

  Object.keys(TOPICS).forEach((subjectId) => {
    const subject = SUBJECTS.find((s) => s.id === subjectId);
    TOPICS[subjectId].forEach((t) => {
      items.push({
        type: "Topic",
        label: t.title,
        subLabel: (subject ? subject.name : "") + " · " + t.summary,
        subjectId: subjectId,
        topicId: t.id,
        haystack: (t.title + " " + t.summary + " " + t.content).toLowerCase(),
      });
    });
  });

  Object.keys(QUIZZES).forEach((subjectId) => {
    const subject = SUBJECTS.find((s) => s.id === subjectId);
    QUIZZES[subjectId].forEach((test, testIndex) => {
      test.questions.forEach((q) => {
        items.push({
          type: "Test question",
          label: q.q,
          subLabel: (subject ? subject.name : "") + " · " + test.name + ": " + test.topic,
          subjectId: subjectId,
          testIndex: testIndex,
          haystack: (q.q + " " + q.options.join(" ") + " " + test.name + " " + test.topic).toLowerCase(),
        });
      });
    });
  });

  Object.keys(PAST_PAPERS).forEach((paperId) => {
    const paper = PAST_PAPERS[paperId];
    const isMock = paper.kind === "mock";
    const baseType = isMock ? "Mock exam" : "Past paper";
    items.push({
      type: baseType,
      label: paper.subject + " — " + paper.title + " " + paper.year,
      subLabel: paper.board + " · " + paper.totalMarks + " marks · " + paper.duration,
      paperId: paperId,
      haystack: (paper.subject + " " + paper.title + " " + paper.year + " " + paper.board).toLowerCase(),
    });
    paper.mcq.forEach((q) => {
      items.push({
        type: baseType + " question",
        label: q.q,
        subLabel: paper.subject + " " + paper.year + " · " + q.num,
        paperId: paperId,
        haystack: (q.q + " " + q.options.join(" ") + " " + q.num).toLowerCase(),
      });
    });
    paper.written.forEach((w) => {
      items.push({
        type: baseType + " question",
        label: w.prompt.split("\n")[0],
        subLabel: paper.subject + " " + paper.year + " · " + w.num,
        paperId: paperId,
        haystack: (w.prompt + " " + w.num).toLowerCase(),
      });
    });
  });

  return items;
}

/**
 * Built once per client session, exactly as the original did at module scope.
 * It is a `let` because content now arrives from the API: the content store
 * rebuilds the index after hydrating, before any screen renders.
 */
export let SEARCH_INDEX: SearchItem[] = buildSearchIndex();

/** Called by the content store once the catalogue has been hydrated. */
export function rebuildSearchIndex(): SearchItem[] {
  SEARCH_INDEX = buildSearchIndex();
  return SEARCH_INDEX;
}
