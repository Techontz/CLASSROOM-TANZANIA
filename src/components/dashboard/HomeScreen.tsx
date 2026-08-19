"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import BottomNav from "@/components/layout/BottomNav";
import { useSession } from "@/components/layout/SessionProvider";
import { SUBJECTS, SUBJECT_BADGE_BG } from "@/data/subjects";
import { SEARCH_INDEX } from "@/lib/search";
import { computeContinueCard, computeSubjectProgress, formatTodayBadge } from "@/lib/format";
import type { SearchItem } from "@/types";

/**
 * Home / student dashboard. Ported 1:1 from index.html `HomeScreen`, including
 * the college subject-visibility rules and the global search behaviour.
 */
export function HomeScreen() {
  const router = useRouter();
  const { student, attemptHistory, unreadNotifCount } = useSession();
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();
  const COLLEGE_RESTRICTED_SUBJECTS = ["phy", "civ", "hist", "kisw", "chem", "rel"];

  function isSubjectVisible(subjectId: string): boolean {
    if (!student.isCollege) return true;
    if (subjectId === "bio") return student.faculty === "Health courses";
    return !COLLEGE_RESTRICTED_SUBJECTS.includes(subjectId);
  }

  const visibleSubjects = SUBJECTS.filter((s) => isSubjectVisible(s.id));

  const results =
    trimmed.length >= 2
      ? SEARCH_INDEX.filter(
          (it) => it.haystack.includes(trimmed) && (!it.subjectId || isSubjectVisible(it.subjectId)),
        ).slice(0, 8)
      : [];

  function handleResultClick(item: SearchItem) {
    if (item.type === "Subject") {
      router.push(`/subjects/${item.subjectId}`);
    } else if (item.type === "Topic") {
      router.push(`/subjects/${item.subjectId}/topics/${item.topicId}`);
    } else if (item.type === "Test question") {
      router.push(`/quizzes/${item.subjectId}/${item.testIndex || 0}`);
    } else if (
      item.type === "Past paper" ||
      item.type === "Past paper question" ||
      item.type === "Mock exam" ||
      item.type === "Mock exam question"
    ) {
      router.push(`/papers/${item.paperId}`);
    }
    setQuery("");
  }

  const todayBadge = formatTodayBadge();
  const subjectProgress = computeSubjectProgress(attemptHistory);
  const continueCard = computeContinueCard(attemptHistory);

  return (
    <Fragment>
      <div className="home-header">
        <button className="avatar" onClick={() => router.push("/profile")} aria-label="Account">
          {student.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={student.avatarUrl} alt="" className="avatar-img" />
          ) : (
            student.name.charAt(0).toUpperCase()
          )}
        </button>
        <div style={{ flex: 1, marginLeft: "10px" }}>
          <p className="greet">Habari, {student.name} 👋</p>
          <p className="level">{student.level}</p>
        </div>
        <button
          className="notif-bell-btn"
          onClick={() => router.push("/notifications")}
          aria-label="Notifications"
        >
          <Icon name="bell" size={19} />
          {unreadNotifCount > 0 && (
            <span className="notif-badge">{unreadNotifCount > 9 ? "9+" : unreadNotifCount}</span>
          )}
        </button>
      </div>

      <div className="continue-card">
        <div style={{ flex: 1 }}>
          <small>{continueCard ? "Unaendelea kusoma" : "Karibu!"}</small>
          <p>
            {continueCard
              ? continueCard.subjectName + ": " + continueCard.label
              : "Start your first test today"}
          </p>
          {continueCard && (
            <div className="progress-row">
              <div className="progress-track-sm">
                <div className="progress-fill-sm" style={{ width: continueCard.pct + "%" }} />
              </div>
              <span style={{ fontSize: "10px", color: "#ccfbf1" }}>{continueCard.pct}%</span>
            </div>
          )}
        </div>
        <div className="date-badge">
          <span className="date-badge-day">{todayBadge.dayLabel}</span>
          <span className="date-badge-month">
            {todayBadge.month} {todayBadge.year}
          </span>
        </div>
        <button
          className="play-btn"
          onClick={() =>
            router.push(
              `/subjects/${continueCard && continueCard.subjectId ? continueCard.subjectId : "math"}`,
            )
          }
          aria-label="Continue"
        >
          <Icon name="play" size={16} />
        </button>
      </div>

      <div className="quick-actions">
        <button className="quick-btn" onClick={() => router.push("/mocks")}>
          <Icon name="fileText" size={16} />
          <p>Mock exam</p>
        </button>
        <button className="quick-btn" onClick={() => router.push("/papers")}>
          <Icon name="book" size={16} />
          <p>Past papers</p>
        </button>
        <button className="quick-btn" onClick={() => router.push("/downloads")}>
          <Icon name="download" size={16} />
          <p>Downloads</p>
        </button>
      </div>

      <div className="search-block">
        <div className="search-input-row">
          <Icon name="search" size={15} />
          <input
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, questions, papers, subjects..."
          />
          {query && (
            <button
              className="search-clear-btn"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <Icon name="x" size={14} />
            </button>
          )}
        </div>
        {trimmed.length >= 2 && (
          <div className="search-results">
            {results.length === 0 && <p className="search-empty">No results for &quot;{query}&quot;</p>}
            {results.map((r, i) => (
              <button key={i} className="search-result-item" onClick={() => handleResultClick(r)}>
                <span className="search-result-type">{r.type}</span>
                <span className="search-result-title">{r.label}</span>
                <span className="search-result-sub">{r.subLabel}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="section-row">
        <p className="section-title">Masomo yako</p>
        <span className="section-hint">All subjects, one syllabus</span>
      </div>

      <div className="subject-grid">
        {visibleSubjects.map((s) => {
          const pct = subjectProgress[s.id] || 0;
          return (
            <button
              key={s.id}
              className="subject-card"
              onClick={() => router.push(`/subjects/${s.id}`)}
            >
              <div
                className="subject-emoji"
                style={{ background: SUBJECT_BADGE_BG[s.id] || "var(--teal-50)" }}
              >
                {s.emoji}
              </div>
              <p className="subject-name">{s.name}</p>
              {pct > 0 ? (
                <div className="subject-progress-row">
                  <div className="subject-progress-track">
                    <div className="subject-progress-fill" style={{ width: pct + "%" }} />
                  </div>
                  <span className="subject-progress-pct">{pct}%</span>
                </div>
              ) : (
                <p className="subject-topics">{s.topics} topics</p>
              )}
            </button>
          );
        })}
      </div>

      <BottomNav active="home" />
    </Fragment>
  );
}

export default HomeScreen;
