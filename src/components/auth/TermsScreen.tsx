"use client";

import { TERMS_SECTIONS } from "@/data/terms";
import ScreenHeader from "@/components/layout/ScreenHeader";

/** Terms & Conditions. Copy and layout unchanged from index.html. */
export function TermsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader title="Terms & Conditions" onBack={onBack} />
      <div className="terms-body">
        <p className="terms-intro">
          Please read this before creating an account. It explains what information Classroom
          Tanzania collects, why, and your rights over it — including for students under 18.
        </p>
        {TERMS_SECTIONS.map((s, i) => (
          <div key={i} className="terms-section">
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
      <div className="q-footer">
        <button className="primary-btn" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default TermsScreen;
