"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import ShareActions from "@/components/ui/ShareActions";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { buildShareUrl } from "@/lib/deep-links";
import {
  createGuardianInviteCode,
  fetchGuardianLinks,
  revokeGuardianLink,
} from "@/services/guardian";
import type { GuardianLink } from "@/types";

/** Student-side invite-code manager. Ported 1:1 from index.html. */
export function GuardianAccessManager({ onBack }: { onBack: () => void }) {
  const [links, setLinks] = useState<GuardianLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [relationship, setRelationship] = useState("Parent");
  const [newCode, setNewCode] = useState("");
  const [genError, setGenError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await fetchGuardianLinks();
    setLinks(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleGenerate() {
    setGenerating(true);
    setGenError("");
    const result = await createGuardianInviteCode(relationship);
    setGenerating(false);
    if (result.error) {
      setGenError(result.error);
      return;
    }
    setNewCode(result.code ?? "");
    refresh();
  }

  async function handleRevoke(linkId: string) {
    await revokeGuardianLink(linkId);
    if (newCode) setNewCode("");
    refresh();
  }

  const activeLinks = links.filter((l) => l.status === "active");
  const pendingLinks = links.filter((l) => l.status === "pending");

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader title="Parent & Teacher Access" onBack={onBack} />

      <div style={{ padding: "8px 16px 24px", flex: 1, overflowY: "auto" }}>
        <p className="footnote" style={{ textAlign: "left", margin: "0 0 16px" }}>
          Give a parent or teacher a read-only view of your progress. They&apos;ll see your test
          scores and subject performance, never your password or account settings.
        </p>

        {newCode && (
          <div className="sub-plan-card" style={{ marginBottom: "16px" }}>
            <p className="sub-plan-name">Your new code</p>
            <p
              style={{
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "3px",
                color: "var(--teal-800)",
                margin: "6px 0 10px",
              }}
            >
              {newCode}
            </p>
            <p className="sub-plan-desc" style={{ marginBottom: "10px" }}>
              Share this with the person you want to give access. It works once.
            </p>
            <ShareActions
              url={buildShareUrl("")}
              message={"My Classroom Tanzania access code: " + newCode}
            />
          </div>
        )}

        <p className="section-title" style={{ margin: "0 0 8px" }}>
          Generate a new code
        </p>
        <label className="field-label">Who is this for?</label>
        <select
          className="select-input"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
        >
          <option>Parent</option>
          <option>Guardian</option>
          <option>Teacher</option>
          <option>Other</option>
        </select>

        {genError && (
          <p className="incomplete-warning" style={{ margin: "-6px 0 14px" }}>
            {genError}
          </p>
        )}

        <button className="primary-btn" disabled={generating} onClick={handleGenerate}>
          {generating ? "Generating..." : "Generate code"}
        </button>

        <p className="section-title" style={{ margin: "22px 0 8px" }}>
          Who has access
        </p>

        {loading && (
          <p className="footnote" style={{ textAlign: "left" }}>
            Loading...
          </p>
        )}

        {!loading && activeLinks.length === 0 && pendingLinks.length === 0 && (
          <p className="footnote" style={{ textAlign: "left" }}>
            No one has access yet.
          </p>
        )}

        <div className="account-menu">
          {activeLinks.map((l) => (
            <div key={l.id} className="account-menu-item" style={{ cursor: "default" }}>
              <Icon name="userPlus" size={16} />
              <span className="account-menu-label">{l.relationship || "Linked"} · active</span>
              <button className="link-btn" onClick={() => handleRevoke(l.id)}>
                Revoke
              </button>
            </div>
          ))}
          {pendingLinks.map((l) => (
            <div key={l.id} className="account-menu-item" style={{ cursor: "default" }}>
              <Icon name="userPlus" size={16} />
              <span className="account-menu-label">
                {l.relationship || "Code"} · not used yet ({l.invite_code})
              </span>
              <button className="link-btn" onClick={() => handleRevoke(l.id)}>
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GuardianAccessManager;
