"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { loadTrendingData } from "@/services/progress";
import { resolveTestIndex } from "@/services/quizzes";
import type { TrendingData } from "@/types";

/** Cross-student analytics. Ported 1:1 from index.html `TrendingScreen`. */
export function TrendingScreen() {
  const router = useRouter();
  const [data, setData] = useState<TrendingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadTrendingData().then((d) => {
      if (active) {
        setData(d);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const hasAnyData =
    data &&
    (data.trending.length > 0 || data.challenging.length > 0 || data.failedQuestions.length > 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader title="Trending" />
      <div style={{ padding: "0 16px 16px", flex: 1, overflowY: "auto" }}>
        <p className="footnote" style={{ textAlign: "left", margin: "4px 0 18px" }}>
          What Tanzania is learning right now.
        </p>

        {loading && (
          <p className="footnote" style={{ textAlign: "left" }}>
            Loading...
          </p>
        )}

        {!loading && !hasAnyData && (
          <p className="footnote" style={{ textAlign: "left" }}>
            Not enough activity across the platform yet to show trends. Check back once more
            students have taken tests.
          </p>
        )}

        {!loading && data && data.trending.length > 0 && (
          <Fragment>
            <p className="section-title" style={{ margin: "0 0 2px" }}>
              📈 Trending Topics
            </p>
            <p className="perf-note" style={{ margin: "0 0 10px" }}>
              Topics students are performing best on
            </p>
            <div className="trend-list">
              {data.trending.map((t, i) => (
                <div key={i} className="trend-item">
                  <span className="trend-dot trend-dot-good" />
                  <span className="trend-item-label">{t.topic}</span>
                  <span className="trend-item-pct trend-pct-good">{t.avg_pct}%</span>
                </div>
              ))}
            </div>
          </Fragment>
        )}

        {!loading && data && data.improved.length > 0 && (
          <Fragment>
            <p className="section-title" style={{ margin: "20px 0 10px" }}>
              Most Improved
            </p>
            <div className="trend-list">
              {data.improved.map((t, i) => (
                <div key={i} className="trend-item">
                  <span className="trend-dot trend-dot-good" />
                  <span className="trend-item-label">{t.topic}</span>
                  <span className="trend-item-pct trend-pct-good">+{t.delta}% this week</span>
                </div>
              ))}
            </div>
          </Fragment>
        )}

        {!loading && data && data.challenging.length > 0 && (
          <Fragment>
            <p className="section-title" style={{ margin: "20px 0 2px" }}>
              🔴 Most Challenging
            </p>
            <p className="perf-note" style={{ margin: "0 0 10px" }}>
              Topics students are struggling with
            </p>
            <div className="trend-list">
              {data.challenging.map((t, i) => (
                <div key={i} className="trend-item">
                  <span className="trend-dot trend-dot-bad" />
                  <span className="trend-item-label">{t.topic}</span>
                  <span className="trend-item-pct trend-pct-bad">{t.avg_pct}%</span>
                </div>
              ))}
            </div>
            {data.challenging[0].subject_id && (
              <button
                className="primary-btn"
                style={{ marginTop: "10px" }}
                onClick={() => router.push(`/subjects/${data.challenging[0].subject_id}`)}
              >
                Practice These Topics
              </button>
            )}
          </Fragment>
        )}

        {!loading && data && data.failedQuestions.length > 0 && (
          <Fragment>
            <p className="section-title" style={{ margin: "22px 0 2px" }}>
              📝 Most Failed Questions
            </p>
            <p className="perf-note" style={{ margin: "0 0 10px" }}>
              Questions students are getting wrong most
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {data.failedQuestions.map((q, i) => (
                <div key={i} className="failed-q-card">
                  <p className="failed-q-meta">
                    {q.subject_name} · {q.test_name}
                  </p>
                  <p className="failed-q-text">{q.question}</p>
                  <p className="failed-q-stat">
                    ❌ {q.wrong_pct}% of students answered incorrectly
                  </p>
                  {q.subject_id && (
                    <button
                      className="outline-btn"
                      onClick={() =>
                        router.push(
                          `/quizzes/${q.subject_id}/${resolveTestIndex(q.subject_id!, q.test_name)}`,
                        )
                      }
                    >
                      Try Question
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </div>
      <BottomNav active="trending" />
    </div>
  );
}

export default TrendingScreen;
