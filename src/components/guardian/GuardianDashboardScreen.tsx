"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { useSession } from "@/components/layout/SessionProvider";
import { claimGuardianCode, fetchLinkedStudents } from "@/services/guardian";
import type { LinkedStudent } from "@/types";

/** Parent/teacher dashboard. Ported 1:1 from index.html `GuardianDashboardScreen`. */
export function GuardianDashboardScreen() {
  const router = useRouter();
  const { student, signOut } = useSession();

  const [students, setStudents] = useState<LinkedStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [code, setCode] = useState("");
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState("");

  const refresh = useCallback(async () => {
    if (!student.userId) return;
    setLoading(true);
    const list = await fetchLinkedStudents();
    setStudents(list);
    setLoading(false);
  }, [student.userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleClaim() {
    if (!code.trim()) return;
    setClaiming(true);
    setClaimError("");
    const result = await claimGuardianCode(code);
    setClaiming(false);
    if (result.error) {
      setClaimError(result.error);
      return;
    }
    setCode("");
    setShowAdd(false);
    refresh();
  }

  async function handleLogout() {
    await signOut();
    router.replace("/login");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div className="home-header">
        <div>
          <p className="greet">Habari, {student.name}</p>
          <p className="level">Parent / Teacher account</p>
        </div>
        <button className="avatar" onClick={handleLogout} aria-label="Log out">
          <Icon name="logOut" size={16} />
        </button>
      </div>

      <div style={{ padding: "0 16px 16px", flex: 1, overflowY: "auto" }}>
        <p className="section-title" style={{ margin: "8px 0" }}>
          Your students
        </p>

        {loading && (
          <p className="footnote" style={{ textAlign: "left" }}>
            Loading...
          </p>
        )}

        {!loading && students.length === 0 && (
          <p className="footnote" style={{ textAlign: "left", margin: "0 0 16px" }}>
            No students linked yet. Ask your child or student to share an access code with you from
            their Account screen.
          </p>
        )}

        <div
          style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}
        >
          {students.map((s) => (
            <button
              key={s.linkId}
              className="paper-card"
              onClick={() =>
                router.push(
                  `/guardian/students/${s.studentId}?name=${encodeURIComponent(s.name)}&level=${encodeURIComponent(s.level)}`,
                )
              }
            >
              <div className="paper-top">
                <p className="paper-subject">{s.name}</p>
                {s.relationship && <span className="paper-board">{s.relationship}</span>}
              </div>
              <p className="paper-meta1">{s.level}</p>
            </button>
          ))}
        </div>

        {!showAdd && (
          <button className="outline-btn" onClick={() => setShowAdd(true)}>
            + Link a student
          </button>
        )}

        {showAdd && (
          <div>
            <label className="field-label">Access code</label>
            <input
              className="text-input"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. AB3D9F2K"
              style={{ textTransform: "uppercase", letterSpacing: "2px" }}
            />
            {claimError && (
              <p className="incomplete-warning" style={{ margin: "-6px 0 14px" }}>
                {claimError}
              </p>
            )}
            <button
              className="primary-btn"
              disabled={claiming || !code.trim()}
              onClick={handleClaim}
            >
              {claiming ? "Linking..." : "Link student"}
            </button>
            <button
              className="outline-btn"
              style={{ marginTop: "8px" }}
              onClick={() => {
                setShowAdd(false);
                setClaimError("");
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GuardianDashboardScreen;
