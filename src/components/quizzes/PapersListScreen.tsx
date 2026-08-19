"use client";

import { useRouter } from "next/navigation";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { PAST_PAPERS } from "@/data/past-papers";
import type { PastPaper } from "@/types";

/** Past papers / mock exams list. Ported 1:1 from index.html `PapersListScreen`. */
export function PapersListScreen({
  kind,
  heading,
  sourceNote,
}: {
  kind: PastPaper["kind"];
  heading: string;
  sourceNote: string;
}) {
  const router = useRouter();
  const papers = Object.values(PAST_PAPERS).filter((p) => p.kind === kind);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader title={heading} onBack={() => router.push("/dashboard")} />
      <div style={{ padding: "0 16px 16px" }}>
        {papers.map((p) => (
          <button key={p.id} onClick={() => router.push(`/papers/${p.id}`)} className="paper-card">
            <div className="paper-top">
              <p className="paper-subject">{p.subject}</p>
              <span className="paper-board">{p.board}</span>
            </div>
            <p className="paper-meta1">
              {p.title} · {p.year}
            </p>
            <p className="paper-meta2">
              {p.mcq.length + 1 + p.written.length} questions · {p.totalMarks} marks · {p.duration}
            </p>
          </button>
        ))}
        {papers.length === 0 && (
          <p className="footnote" style={{ margin: "8px 0" }}>
            Nothing here yet. Check back soon.
          </p>
        )}
        <p className="source-note">{sourceNote}</p>
      </div>
    </div>
  );
}

export default PapersListScreen;
