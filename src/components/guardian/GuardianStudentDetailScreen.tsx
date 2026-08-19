"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { loadStudentAttemptHistory } from "@/services/progress";
import { bandFor } from "@/lib/format";
import type { AttemptRecord } from "@/types";

/** Read-only student view for a guardian. Ported 1:1 from index.html. */
export function GuardianStudentDetailScreen({
  studentId,
  studentName,
  studentLevel,
}: {
  studentId: string;
  studentName: string;
  studentLevel: string;
}) {
  const router = useRouter();
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadStudentAttemptHistory(studentId).then((data) => {
      if (active) {
        setAttempts(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [studentId]);

  const hasData = attempts.length > 0;
  const totalCorrect = attempts.reduce((a, x) => a + x.score, 0);
  const totalQuestions = attempts.reduce((a, x) => a + x.total, 0);
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const masteredCount = attempts.filter((x) => x.pct >= 70).length;
  const overallMastery = hasData ? Math.round((masteredCount / attempts.length) * 100) : 0;

  const bySubject: Record<
    string,
    { name: string; totalScore: number; totalMax: number; count: number }
  > = {};
  attempts.forEach((a) => {
    const key = a.subjectName || "Other";
    if (!bySubject[key]) {
      bySubject[key] = { name: key, totalScore: 0, totalMax: 0, count: 0 };
    }
    bySubject[key].totalScore += a.score;
    bySubject[key].totalMax += a.total;
    bySubject[key].count += 1;
  });

  const subjectRows = Object.values(bySubject)
    .map((s) => ({ ...s, pct: s.totalMax > 0 ? Math.round((s.totalScore / s.totalMax) * 100) : 0 }))
    .sort((a, b) => a.pct - b.pct);

  const recent = attempts.slice(-8).reverse();

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader
        title={studentName}
        subtitle={studentLevel}
        onBack={() => router.push("/guardian")}
      />

      {loading && (
        <p className="footnote" style={{ padding: "16px" }}>
          Loading...
        </p>
      )}

      {!loading && !hasData && (
        <div className="results-wrap">
          <div className="score-circle">
            <Icon name="chart" size={22} />
          </div>
          <p className="results-line1">No activity yet</p>
          <p className="results-line2">
            Once {studentName.split(" ")[0]} takes a test or past paper, it&apos;ll show up here.
          </p>
        </div>
      )}

      {!loading && hasData && (
        <div style={{ padding: "4px 16px 16px", flex: 1, overflowY: "auto" }}>
          <p className="section-title" style={{ margin: "8px 0" }}>
            Performance Overview
          </p>
          <div className="perf-stats-row">
            <div className="perf-stat-card">
              <div className="perf-stat-circle perf-stat-circle-mastery">{overallMastery}%</div>
              <p className="perf-stat-label">Overall mastery</p>
            </div>
            <div className="perf-stat-card">
              <div className="perf-stat-circle perf-stat-circle-accuracy">{overallAccuracy}%</div>
              <p className="perf-stat-label">Accuracy rate</p>
            </div>
            <div className="perf-stat-card">
              <div className="perf-stat-circle" style={{ color: "var(--gray-700)" }}>
                {attempts.length}
              </div>
              <p className="perf-stat-label">Tests taken</p>
            </div>
          </div>

          <p className="section-title" style={{ margin: "18px 0 8px" }}>
            Recent activity
          </p>
          <div className="perf-trend">
            {recent.map((a) => {
              const band = bandFor(a.pct);
              return (
                <div key={a.id} className="perf-trend-row">
                  <div className="perf-trend-label">
                    <p className="perf-trend-title">
                      {a.subjectName} · {a.label}
                    </p>
                    <p className="perf-trend-sub">
                      {a.score}/{a.total}
                    </p>
                  </div>
                  <div className="perf-trend-bar-track">
                    <div
                      className={"perf-trend-bar-fill " + band.cls}
                      style={{ width: a.pct + "%" }}
                    />
                  </div>
                  <span className="perf-trend-pct">{a.pct}%</span>
                </div>
              );
            })}
          </div>

          <p className="section-title" style={{ margin: "20px 0 4px" }}>
            Subject Breakdown
          </p>
          <div className="perf-subject-list">
            {subjectRows.map((s) => {
              const band = bandFor(s.pct);
              return (
                <div key={s.name} className="perf-subject-row">
                  <div className="perf-subject-top">
                    <p className="perf-subject-name">{s.name}</p>
                    <span className={"perf-subject-badge " + band.cls}>{band.label}</span>
                  </div>
                  <div className="perf-trend-bar-track">
                    <div
                      className={"perf-trend-bar-fill " + band.cls}
                      style={{ width: s.pct + "%" }}
                    />
                  </div>
                  <p className="perf-subject-meta">
                    {s.pct}% average · {s.count} attempt{s.count === 1 ? "" : "s"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default GuardianStudentDetailScreen;
