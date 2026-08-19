"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BookmarkButton from "@/components/ui/BookmarkButton";
import ShareButton from "@/components/ui/ShareButton";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { useSession } from "@/components/layout/SessionProvider";
import { SUBJECTS } from "@/data/subjects";
import { TOPICS } from "@/data/topics";
import { saveTopicProgress } from "@/services/progress";

/** Topic reader. Marks the topic as read on open, exactly as the original did. */
export function TopicDetailScreen({
  subjectId,
  topicId,
}: {
  subjectId: string;
  topicId: string;
}) {
  const router = useRouter();
  const { student } = useSession();
  const userId = student.userId;

  const topics = TOPICS[subjectId] || [];
  const topic = topics.find((t) => t.id === topicId) || topics[0];
  const topicKey = topic?.id;

  useEffect(() => {
    if (topicKey && userId) {
      saveTopicProgress(subjectId, topicKey);
    }
  }, [subjectId, topicKey, userId]);

  if (!topic) {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <ScreenHeader title="Topic" onBack={() => router.push(`/subjects/${subjectId}`)} />
        <p className="footnote" style={{ padding: "16px" }}>
          This topic isn&apos;t available yet.
        </p>
      </div>
    );
  }

  const subjectName = (SUBJECTS.find((s) => s.id === subjectId) || { name: "" }).name || "";

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader
        title={topic.title}
        onBack={() => router.push(`/subjects/${subjectId}`)}
        actions={
          <>
            <BookmarkButton
              userId={userId}
              type="topic"
              title={topic.title}
              subtitle={subjectName + " · Topic"}
              subjectId={subjectId}
              subjectName={subjectName}
              deepLink={"topic/" + subjectId + "/" + topicId}
            />
            <ShareButton
              hashPath={"topic/" + subjectId + "/" + topicId}
              message={"Check out this topic: " + topic.title}
            />
          </>
        }
      />

      <div style={{ padding: "4px 16px 20px", flex: 1, overflowY: "auto" }}>
        <p className="topic-body">{topic.content}</p>
      </div>

      <div className="q-footer">
        <button className="outline-btn" onClick={() => router.push(`/subjects/${subjectId}`)}>
          Back to topics
        </button>
      </div>
    </div>
  );
}

export default TopicDetailScreen;
