"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import BookmarkButton from "@/components/ui/BookmarkButton";
import ShareButton from "@/components/ui/ShareButton";
import { useSession } from "@/components/layout/SessionProvider";
import { SUBJECTS } from "@/data/subjects";
import { QUIZZES } from "@/data/quizzes";
import { logQuestionResponse, submitQuizAttempt } from "@/services/progress";
import type { QuizFinishPayload } from "@/types";

// ---------------------------------------------------------------------------
// Quiz + results.
//
// The original kept the quiz and its results screen in one component tree, with
// the score held in parent state. That is preserved here rather than pushing
// the score through the URL: taking a test and seeing the result is one flow,
// and a results URL with no attempt behind it would be meaningless.
// ---------------------------------------------------------------------------

export function QuizFlow({ subjectId, testIndex }: { subjectId: string; testIndex: number }) {
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [attemptKey, setAttemptKey] = useState(0);
  const router = useRouter();
  const { student, addAttempt } = useSession();

  /**
   * The attempt is marked by the API against the stored answer key — the score
   * shown on the results screen is the server's, not one computed here.
   */
  async function handleFinish(payload: QuizFinishPayload) {
    const attempt = await submitQuizAttempt(
      payload.quizId,
      payload.answers,
      payload.durationMs,
    );

    if (attempt) {
      addAttempt(attempt);
      setResult({ score: attempt.score, total: attempt.total });
      return;
    }

    // The submission failed (offline, say). The student still sees their
    // result; it simply isn't in their history until they take it again.
    setResult({ score: payload.score, total: payload.total });
  }

  if (result) {
    return (
      <ResultsScreen
        score={result.score}
        total={result.total}
        onRetry={() => {
          setResult(null);
          setAttemptKey((k) => k + 1);
        }}
        onHome={() => router.push("/dashboard")}
      />
    );
  }

  return (
    <QuizScreen
      key={attemptKey}
      subjectId={subjectId}
      testIndex={testIndex}
      onExit={() => router.push(`/subjects/${subjectId}`)}
      onFinish={handleFinish}
      userId={student.userId}
    />
  );
}

/** Ported 1:1 from index.html `QuizScreen`. */
export function QuizScreen({
  subjectId,
  testIndex,
  onExit,
  onFinish,
  userId,
}: {
  subjectId: string;
  testIndex: number;
  onExit: () => void;
  onFinish: (payload: QuizFinishPayload) => void;
  userId: string | null;
}) {
  const subjectTests = QUIZZES[subjectId] || QUIZZES.math;
  const quiz = subjectTests[testIndex] || subjectTests[0];
  const subjectName = (SUBJECTS.find((s) => s.id === subjectId) || { name: "" }).name || "";
  const total = quiz.questions.length;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(total).fill(null));
  const [incompleteWarning, setIncompleteWarning] = useState<number[] | null>(null);
  const [startedAt] = useState(() => Date.now());

  const question = quiz.questions[index];
  const selected = answers[index];
  const answered = selected !== null;
  const answeredCount = answers.filter((a) => a !== null).length;
  const score = answers.reduce<number>(
    (acc, sel, i) => acc + (sel === quiz.questions[i].correct ? 1 : 0),
    0,
  );

  function handleSelect(i: number) {
    if (answered) return;
    setAnswers((prev) => {
      const next = prev.slice();
      next[index] = i;
      return next;
    });
    setIncompleteWarning(null);
    // Logged as it happens, so answers to an abandoned test still count
    // toward the cross-student Trending aggregates.
    if (userId) logQuestionResponse(quiz.id, index, i);
  }

  function goBack() {
    setIncompleteWarning(null);
    if (index > 0) setIndex((i) => i - 1);
  }

  function goForward() {
    setIncompleteWarning(null);
    if (index + 1 < total) {
      setIndex((i) => i + 1);
      return;
    }
    const unansweredNumbers = answers.reduce<number[]>((list, a, i) => {
      if (a === null) list.push(i + 1);
      return list;
    }, []);
    if (unansweredNumbers.length > 0) {
      setIndex(unansweredNumbers[0] - 1);
      setIncompleteWarning(unansweredNumbers);
      return;
    }
    onFinish({
      quizId: quiz.id,
      answers,
      score,
      total,
      subjectId,
      subjectName,
      testName: quiz.name,
      testTopic: quiz.topic,
      durationMs: Date.now() - startedAt,
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div className="q-header">
        <button className="back-btn" onClick={onExit} aria-label="Exit quiz">
          <Icon name="chevronLeft" size={18} />
        </button>
        <div>
          <p className="q-title">
            {subjectName} · {quiz.name}: {quiz.topic}
          </p>
          <p className="q-sub">
            Question {index + 1} of {total} · {answeredCount}/{total} answered
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
          type="practice_set"
          title={quiz.name + ": " + quiz.topic}
          subtitle={subjectName + " · Practice set"}
          subjectId={subjectId}
          subjectName={subjectName}
          deepLink={"quiz/" + subjectId + "/" + testIndex}
        />
        <ShareButton
          hashPath={"quiz/" + subjectId + "/" + testIndex}
          message={subjectName + " " + quiz.name + " on Classroom Tanzania"}
        />
      </div>

      <div className="q-progress-wrap">
        <div className="q-progress-track">
          <div className="q-progress-fill" style={{ width: (answeredCount / total) * 100 + "%" }} />
        </div>
      </div>

      <div className="q-body">
        <p className="q-text">{question.q}</p>
        {question.options.map((opt, i) => {
          let cls = "option-btn";
          if (answered && i === question.correct) cls += " correct";
          else if (answered && i === selected && i !== question.correct) cls += " wrong";
          if (answered) cls += " locked";
          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={answered}>
              <span>{opt}</span>
              {answered && i === question.correct && <Icon name="check" size={16} />}
              {answered && i === selected && i !== question.correct && <Icon name="x" size={16} />}
            </button>
          );
        })}

        {answered && (
          <p className="locked-note">Answer locked in. Use the arrows to move between questions.</p>
        )}
        {!answered && (
          <p className="skip-note">You can skip this and come back later using the arrows.</p>
        )}
        {incompleteWarning && (
          <p className="incomplete-warning">
            {incompleteWarning.length === 1
              ? "Question " +
                incompleteWarning[0] +
                " has not been answered yet. Please answer it before finishing."
              : "Questions " +
                incompleteWarning.join(", ") +
                " have not been answered yet. Please answer them before finishing."}
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
            {index + 1 < total ? "Next question" : "Finish test"}
          </button>
          <button className="footer-nav-btn" onClick={goForward} aria-label="Next question">
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Ported 1:1 from index.html `ResultsScreen`. */
export function ResultsScreen({
  score,
  total,
  onRetry,
  onHome,
}: {
  score: number;
  total: number;
  onRetry: () => void;
  onHome: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const message =
    pct >= 80
      ? "Vizuri sana! Great work."
      : pct >= 50
        ? "Good effort, keep practising."
        : "Revise this topic and try again.";

  return (
    <div className="results-wrap">
      <div className="score-circle">
        <span>{pct}%</span>
      </div>
      <p className="results-line1">
        {score} out of {total} correct
      </p>
      <p className="results-line2">{message}</p>
      <div style={{ width: "100%", marginTop: "8px" }}>
        <button className="primary-btn" style={{ marginBottom: "8px" }} onClick={onRetry}>
          Try again
        </button>
        <button className="outline-btn" onClick={onHome}>
          Back to subjects
        </button>
      </div>
    </div>
  );
}

export default QuizFlow;
