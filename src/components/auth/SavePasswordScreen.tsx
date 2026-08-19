"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

/**
 * Ported from index.html for completeness.
 *
 * Note: this component was defined in the original file but never rendered by
 * any screen. It is preserved here unchanged so nothing is lost, but it is
 * likewise not wired into any route.
 */
export function SavePasswordScreen({
  studentName,
  onContinue,
}: {
  studentName?: string;
  onContinue: () => void;
}) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="results-wrap">
      <div className="score-circle">
        <Icon name="check" size={22} />
      </div>
      <p className="results-line1">Save password for Classroom Tanzania?</p>
      <p className="results-line2">
        {saved
          ? "Saved on this device."
          : `We can remember this password for ${studentName || "your account"} so you log in faster next time.`}
      </p>
      <div style={{ width: "100%", marginTop: "8px" }}>
        {!saved && (
          <button
            className="primary-btn"
            style={{ marginBottom: "8px" }}
            onClick={() => setSaved(true)}
          >
            Save password
          </button>
        )}
        <button className={saved ? "primary-btn" : "outline-btn"} onClick={onContinue}>
          {saved ? "Continue" : "Not now"}
        </button>
      </div>
    </div>
  );
}

export default SavePasswordScreen;
