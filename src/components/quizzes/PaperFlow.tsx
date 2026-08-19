"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import BookmarkButton from "@/components/ui/BookmarkButton";
import ShareButton from "@/components/ui/ShareButton";
import { useSession } from "@/components/layout/SessionProvider";
import { PAST_PAPERS } from "@/data/past-papers";
import { submitPaperAttempt } from "@/services/progress";
import type { PaperFinishPayload, PaperMcq, PaperMatching, PaperWritten, PastPaper } from "@/types";

// ---------------------------------------------------------------------------
// Past paper / mock exam taking + results.
//
// A paper is flattened into an ordered list of "steps": every MCQ, then the
// single matching question, then every written question. All step/scoring logic
// below is ported 1:1 from index.html.
// ---------------------------------------------------------------------------

type Step =
  | { type: "mcq"; data: PaperMcq }
  | { type: "matching"; data: PaperMatching }
  | { type: "written"; data: PaperWritten };

type McqResponse = { selected: number | null };
type MatchingResponse = { answers: Record<string, string>; checked: boolean };
type WrittenResponse = { text: string; showModel: boolean; reviewed: boolean };
type Response = McqResponse & MatchingResponse & WrittenResponse;

/** Ported unchanged from index.html `buildSteps`. */
function buildSteps(paper: PastPaper): Step[] {
  const steps: Step[] = paper.mcq.map((q) => ({ type: "mcq", data: q }));
  steps.push({ type: "matching", data: paper.matching });
  paper.written.forEach((w) => steps.push({ type: "written", data: w }));
  return steps;
}

/** Ported unchanged from index.html `defaultResponseFor`. */
function defaultResponseFor(step: Step): Response {
  if (step.type === "mcq") {
    return { selected: null, answers: {}, checked: false, text: "", showModel: false, reviewed: false };
  }
  if (step.type === "matching") {
    return { selected: null, answers: {}, checked: false, text: "", showModel: false, reviewed: false };
  }
  return { selected: null, answers: {}, checked: false, text: "", showModel: false, reviewed: false };
}

export function PaperFlow({ paperId }: { paperId: string }) {
  const router = useRouter();
  const { student, addAttempt } = useSession();
  const [result, setResult] = useState<PaperFinishPayload | null>(null);
  const [attemptKey, setAttemptKey] = useState(0);

  const paper = PAST_PAPERS[paperId];

  function backToList() {
    router.push(paper && paper.kind === "mock" ? "/mocks" : "/papers");
  }

  if (!paper) {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div className="q-header">
          <button className="back-btn" onClick={backToList} aria-label="Back">
            <Icon name="chevronLeft" size={18} />
          </button>
          <p className="q-title">Paper</p>
        </div>
        <p className="footnote" style={{ padding: "16px" }}>
          This paper isn&apos;t available yet.
        </p>
      </div>
    );
  }

  /**
   * Section A and the matching question are marked by the API against the
   * stored key; Sections B and C are self-reviewed, so the API records and
   * counts them. The results screen reports the server's figures.
   */
  async function handleFinish(res: PaperFinishPayload) {
    const saved = await submitPaperAttempt(res.paperId, {
      mcq: res.responses.mcq,
      matching: res.responses.matching,
      written: res.responses.written,
      durationMs: res.durationMs,
    });

    if (saved) {
      addAttempt(saved.attempt);
      setResult({
        ...res,
        mcqScore: saved.mcqScore,
        mcqTotal: saved.mcqTotal,
        matchScore: saved.matchScore,
        matchTotal: saved.matchTotal,
        reviewedCount: saved.reviewedCount,
        writtenTotal: saved.writtenTotal,
      });
      return;
    }

    // The submission failed; the student still sees their result.
    setResult(res);
  }

  if (result) {
    return (
      <PaperResultsScreen
        result={result}
        onRetry={() => {
          setResult(null);
          setAttemptKey((k) => k + 1);
        }}
        onHome={backToList}
      />
    );
  }

  return (
    <PaperTakingScreen
      key={attemptKey}
      paperId={paperId}
      onExit={backToList}
      onFinish={handleFinish}
      userId={student.userId}
    />
  );
}

/** Ported 1:1 from index.html `PaperTakingScreen`. */
export function PaperTakingScreen({
  paperId,
  onExit,
  onFinish,
  userId,
}: {
  paperId: string;
  onExit: () => void;
  onFinish: (res: PaperFinishPayload) => void;
  userId: string | null;
}) {
  const paper = PAST_PAPERS[paperId];
  const [steps] = useState<Step[]>(() => buildSteps(paper));
  const total = steps.length;

  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<Response[]>(() => steps.map(defaultResponseFor));
  const [incompleteWarning, setIncompleteWarning] = useState<string[] | null>(null);
  const [startedAt] = useState(() => Date.now());

  const step = steps[index];
  const response = responses[index];

  function updateResponse(patch: Partial<Response>) {
    setResponses((prev) => {
      const next = prev.slice();
      next[index] = { ...next[index], ...patch };
      return next;
    });
  }

  function isStepComplete(s: Step, r: Response): boolean {
    if (s.type === "mcq") return r.selected !== null;
    if (s.type === "matching") return r.checked === true;
    return true;
  }

  function labelFor(s: Step): string {
    return s.type === "mcq" ? "Question " + s.data.num : "Question 2 (matching)";
  }

  const requiredCount = steps.filter((s) => s.type !== "written").length;
  const completedCount = steps.reduce(
    (acc, s, i) => acc + (s.type !== "written" && isStepComplete(s, responses[i]) ? 1 : 0),
    0,
  );

  function goBack() {
    setIncompleteWarning(null);
    if (index > 0) setIndex((i) => i - 1);
  }

  function goForward() {
    setIncompleteWarning(null);
    if (step.type === "written" && !response.reviewed) {
      updateResponse({ reviewed: true });
    }
    if (index + 1 < total) {
      setIndex((i) => i + 1);
      return;
    }

    const finalResponses = responses.map((r, i) =>
      i === index && step.type === "written" && !response.reviewed ? { ...r, reviewed: true } : r,
    );

    const incompleteSteps = steps.filter(
      (s, i) => s.type !== "written" && !isStepComplete(s, finalResponses[i]),
    );
    if (incompleteSteps.length > 0) {
      const firstIncompleteIndex = steps.findIndex(
        (s, i) => s.type !== "written" && !isStepComplete(s, finalResponses[i]),
      );
      setIndex(firstIncompleteIndex);
      setIncompleteWarning(incompleteSteps.map(labelFor));
      return;
    }

    const mcqScore = steps.reduce(
      (acc, s, i) =>
        acc + (s.type === "mcq" && finalResponses[i].selected === s.data.correct ? 1 : 0),
      0,
    );

    const matchStepIndex = steps.findIndex((s) => s.type === "matching");
    const matchStep = steps[matchStepIndex] as { type: "matching"; data: PaperMatching };
    const matchResp = finalResponses[matchStepIndex];
    let matchScore = 0;
    if (matchResp && matchResp.checked) {
      matchStep.data.listA.forEach((item) => {
        if (matchResp.answers[item.id] === matchStep.data.correct[item.id]) matchScore += 1;
      });
    }

    const reviewedCount = steps.reduce(
      (acc, s, i) => acc + (s.type === "written" && finalResponses[i].reviewed ? 1 : 0),
      0,
    );

    onFinish({
      paperId,
      responses: {
        mcq: steps.flatMap((s, i) => (s.type === "mcq" ? [finalResponses[i].selected] : [])),
        matching: matchResp ? matchResp.answers : {},
        written: steps.reduce<{ text: string; reviewed: boolean }[]>((acc, s, i) => {
          if (s.type === "written") {
            acc.push({ text: finalResponses[i].text, reviewed: finalResponses[i].reviewed });
          }
          return acc;
        }, []),
      },
      subject: paper.subject,
      title: paper.title,
      year: paper.year,
      mcqScore,
      mcqTotal: paper.mcq.length,
      matchScore,
      matchTotal: paper.matching.listA.length,
      reviewedCount,
      writtenTotal: paper.written.length,
      durationMs: Date.now() - startedAt,
    });
  }

  function handleMcqSelect(i: number) {
    if (response.selected !== null) return;
    updateResponse({ selected: i });
    setIncompleteWarning(null);
  }

  function handleMatchChange(itemId: string, value: string) {
    if (response.checked) return;
    updateResponse({ answers: { ...response.answers, [itemId]: value } });
  }

  function handleCheckMatching() {
    updateResponse({ checked: true });
    setIncompleteWarning(null);
  }

  const matchScoreNow =
    step.type === "matching" && response.checked
      ? step.data.listA.filter((item) => response.answers[item.id] === step.data.correct[item.id])
          .length
      : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div className="q-header">
        <button className="back-btn" onClick={onExit} aria-label="Exit paper">
          <Icon name="chevronLeft" size={18} />
        </button>
        <div>
          <p className="q-title">
            {paper.subject} · {paper.title} {paper.year}
          </p>
          <p className="q-sub">
            Question {index + 1} of {total} · {completedCount}/{requiredCount} completed
          </p>
        </div>
        <div className="q-nav-arrows">
          <button
            className="nav-arrow-btn"
            onClick={goBack}
            disabled={index === 0}
            aria-label="Previous question"
          >
            <Icon name="chevronLeft" size={16} />
          </button>
          <button className="nav-arrow-btn" onClick={goForward} aria-label="Next question">
            <Icon name="chevronRight" size={16} />
          </button>
        </div>
        <BookmarkButton
          userId={userId}
          type="past_paper"
          title={paper.title + " " + paper.year}
          subtitle={paper.subject + " · Past paper"}
          subjectId={null}
          subjectName={paper.subject}
          deepLink={"paper/" + paperId}
        />
        <ShareButton
          hashPath={"paper/" + paperId}
          message={paper.subject + " — " + paper.title + " " + paper.year}
        />
      </div>

      <div className="q-progress-wrap">
        <div className="q-progress-track">
          <div
            className="q-progress-fill"
            style={{ width: (completedCount / requiredCount) * 100 + "%" }}
          />
        </div>
      </div>

      <div className="q-body">
        {step.type === "mcq" && (
          <Fragment>
            <p className="q-tag">Section A · {step.data.num}</p>
            <p className="q-text">{step.data.q}</p>
            {step.data.options.map((opt, i) => {
              const answered = response.selected !== null;
              let cls = "option-btn";
              if (answered && i === step.data.correct) cls += " correct";
              else if (answered && i === response.selected && i !== step.data.correct)
                cls += " wrong";
              if (answered) cls += " locked";
              return (
                <button
                  key={i}
                  className={cls}
                  onClick={() => handleMcqSelect(i)}
                  disabled={answered}
                >
                  <span>{opt}</span>
                  {answered && i === step.data.correct && <Icon name="check" size={16} />}
                  {answered && i === response.selected && i !== step.data.correct && (
                    <Icon name="x" size={16} />
                  )}
                </button>
              );
            })}
            {response.selected !== null && (
              <p className="locked-note">
                Answer locked in. Use the arrows to move between questions.
              </p>
            )}
            {response.selected === null && (
              <p className="skip-note">You can skip this and come back later using the arrows.</p>
            )}
          </Fragment>
        )}

        {step.type === "matching" && (
          <Fragment>
            <p className="q-tag">Section A · Question 2</p>
            <p className="q-text">{step.data.prompt}</p>
            {step.data.listA.map((item) => {
              const isCorrect =
                response.checked && response.answers[item.id] === step.data.correct[item.id];
              const isWrong =
                response.checked &&
                response.answers[item.id] &&
                response.answers[item.id] !== step.data.correct[item.id];
              let selCls = "match-select";
              if (isCorrect) selCls += " correct";
              if (isWrong) selCls += " wrong";
              return (
                <div key={item.id} className="match-row">
                  <span className="match-label">{item.label}</span>
                  <select
                    className={selCls}
                    value={response.answers[item.id] || ""}
                    disabled={response.checked}
                    onChange={(e) => handleMatchChange(item.id, e.target.value)}
                  >
                    <option value="">--</option>
                    {step.data.listB.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.id}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
            <div style={{ marginTop: "8px" }}>
              {step.data.listB.map((b) => (
                <p key={b.id} className="legend">
                  {b.id}: {b.label}
                </p>
              ))}
            </div>
            {!response.checked && (
              <button
                className="outline-btn"
                style={{
                  marginTop: "8px",
                  borderColor: "var(--teal-600)",
                  color: "var(--teal-700)",
                }}
                onClick={handleCheckMatching}
              >
                Check answers
              </button>
            )}
            {response.checked && (
              <p style={{ fontSize: "12px", color: "var(--gray-700)", marginTop: "8px" }}>
                {matchScoreNow} out of {step.data.listA.length} correct (locked in)
              </p>
            )}
            {!response.checked && (
              <p className="skip-note">You can skip this and come back later using the arrows.</p>
            )}
          </Fragment>
        )}

        {step.type === "written" && (
          <Fragment>
            <p className="q-tag">
              Section B/C · {step.data.num} · {step.data.marks} marks
            </p>
            <p className="q-text">{step.data.prompt}</p>
            <textarea
              className="written-textarea"
              rows={4}
              value={response.text}
              disabled={response.reviewed}
              onChange={(e) => updateResponse({ text: e.target.value })}
              placeholder="Type your own answer here to practise, then compare it with the model answer."
            />
            <button
              className="model-toggle"
              onClick={() => updateResponse({ showModel: !response.showModel })}
            >
              <Icon name={response.showModel ? "eyeOff" : "eye"} size={14} />
              {response.showModel ? "Hide model answer" : "Show model answer"}
            </button>
            {response.showModel && (
              <div className="model-box">
                <p>{step.data.model}</p>
              </div>
            )}
            {response.reviewed && (
              <p className="locked-note">
                Marked as reviewed. Use the arrows to move between questions.
              </p>
            )}
          </Fragment>
        )}

        {incompleteWarning && (
          <p className="incomplete-warning">
            {incompleteWarning.length === 1
              ? incompleteWarning[0] + " has not been answered yet. Please complete it before finishing."
              : incompleteWarning.join(", ") +
                " have not been answered yet. Please complete them before finishing."}
          </p>
        )}
      </div>

      <div className="q-footer">
        <div className="q-footer-row">
          <button
            className="footer-nav-btn"
            onClick={goBack}
            disabled={index === 0}
            aria-label="Previous question"
          >
            <Icon name="chevronLeft" size={18} />
          </button>
          <button className="primary-btn" onClick={goForward}>
            {step.type === "written"
              ? index + 1 < total
                ? "Reviewed, next question"
                : "Reviewed, see summary"
              : index + 1 < total
                ? "Next"
                : "See summary"}
          </button>
          <button className="footer-nav-btn" onClick={goForward} aria-label="Next question">
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Ported 1:1 from index.html `PaperResultsScreen`. */
export function PaperResultsScreen({
  result,
  onRetry,
  onHome,
}: {
  result: PaperFinishPayload;
  onRetry: () => void;
  onHome: () => void;
}) {
  const objectiveScore = result.mcqScore + result.matchScore;
  const objectiveTotal = result.mcqTotal + result.matchTotal;
  const pct = Math.round((objectiveScore / objectiveTotal) * 100);

  return (
    <div className="results-wrap">
      <div className="score-circle">
        <span>{pct}%</span>
      </div>
      <p className="results-line1">
        Section A: {objectiveScore} of {objectiveTotal} correct
      </p>
      <p className="results-line2">
        Sections B &amp; C: you reviewed {result.reviewedCount} of {result.writtenTotal} written
        questions
      </p>
      <p className="results-line3">
        Written answers aren&apos;t auto-marked. Compare your notes with the model answers, or ask a
        teacher to check them.
      </p>
      <div style={{ width: "100%" }}>
        <button className="primary-btn" style={{ marginBottom: "8px" }} onClick={onRetry}>
          Retake paper
        </button>
        <button className="outline-btn" onClick={onHome}>
          Back to past papers
        </button>
      </div>
    </div>
  );
}

export default PaperFlow;
