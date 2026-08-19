"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import ShareButton from "@/components/ui/ShareButton";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { SUBJECTS } from "@/data/subjects";
import { QUIZZES } from "@/data/quizzes";
import { TOPICS } from "@/data/topics";
import SubjectLessonsSection from "@/components/video/SubjectLessonsSection";

/** Subject detail: tests + topics. Ported 1:1 from index.html. */
export function SubjectDetailScreen({ subjectId }: { subjectId: string }) {
  const router = useRouter();
  const subject = SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[0];
  const tests = QUIZZES[subjectId] || [];
  const topics = TOPICS[subjectId] || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader
        title={subject.name}
        onBack={() => router.push("/dashboard")}
        actions={
          <ShareButton
            hashPath={"subject/" + subjectId}
            message={"Check out " + subject.name + " on Classroom Tanzania"}
          />
        }
      />

      <div style={{ padding: "4px 16px 16px", flex: 1, overflowY: "auto" }}>
        <div className="subject-hero">
          <span className="subject-hero-emoji">{subject.emoji}</span>
          <div>
            <p className="subject-hero-name">{subject.name}</p>
            <p className="subject-hero-meta">
              {topics.length} topics · {tests.length} tests
            </p>
          </div>
        </div>

        <p className="section-title" style={{ margin: "0 0 8px" }}>
          Tests
        </p>
        <div className="topic-list" style={{ marginBottom: "18px" }}>
          {tests.map((t, i) => (
            <button
              key={i}
              className="test-card"
              onClick={() => router.push(`/quizzes/${subjectId}/${i}`)}
            >
              <div className="test-card-icon">
                <Icon name="play" size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <p className="test-card-title">{t.name}</p>
                <p className="test-card-sub">
                  {t.topic} · {t.questions.length} questions
                </p>
              </div>
              <Icon name="chevronRight" size={16} />
            </button>
          ))}
          {tests.length === 0 && (
            <p className="footnote" style={{ margin: "8px 0" }}>
              Tests for this subject are coming soon.
            </p>
          )}
        </div>

        <p className="section-title" style={{ margin: "0 0 8px" }}>
          Topics
        </p>
        <div className="topic-list">
          {topics.map((t) => (
            <button
              key={t.id}
              className="topic-card"
              onClick={() => router.push(`/subjects/${subjectId}/topics/${t.id}`)}
            >
              <div>
                <p className="topic-title">{t.title}</p>
                <p className="topic-summary">{t.summary}</p>
              </div>
              <Icon name="chevronRight" size={16} />
            </button>
          ))}
          {topics.length === 0 && (
            <p className="footnote" style={{ margin: "8px 0" }}>
              Topics for this subject are coming soon.
            </p>
          )}
        </div>

        {/* Renders nothing when this subject has no published video course. */}
        <SubjectLessonsSection subjectId={subjectId} />
      </div>
    </div>
  );
}

export default SubjectDetailScreen;
