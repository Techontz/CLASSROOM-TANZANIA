"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { resetPasswordForEmail } from "@/services/auth";

/** Password reset request. Copy and flow unchanged from index.html. */
export function ForgotPasswordScreen() {
  const router = useRouter();
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function onBack() {
    router.push("/login");
  }

  async function handleSend() {
    setErrorMsg("");
    setLoading(true);
    const { error } = await resetPasswordForEmail(contact.trim());
    setLoading(false);
    if (error) {
      setErrorMsg(error.message || "Something went wrong sending that email.");
      return;
    }
    setSent(true);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader title="Reset password" onBack={onBack} />
      <div style={{ padding: "8px 20px 24px" }}>
        {!sent && (
          <Fragment>
            <p className="footnote" style={{ textAlign: "left", margin: "0 0 16px" }}>
              Enter the email linked to your account and we&apos;ll send you a link to reset your
              password.
            </p>
            <label className="field-label">Email</label>
            <input
              className="text-input"
              type="email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="e.g. amina@example.com"
              autoComplete="username"
            />
            {errorMsg && (
              <p className="incomplete-warning" style={{ margin: "-6px 0 14px" }}>
                {errorMsg}
              </p>
            )}
            <button
              className="primary-btn"
              disabled={!contact.trim() || loading}
              onClick={handleSend}
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </Fragment>
        )}

        {sent && (
          <Fragment>
            <div className="score-circle" style={{ margin: "8px auto 16px" }}>
              <Icon name="check" size={24} />
            </div>
            <p className="results-line1" style={{ textAlign: "center" }}>
              Reset link sent
            </p>
            <p className="footnote" style={{ margin: "8px 0 20px" }}>
              Check {contact} for an email with instructions to reset your password.
            </p>
            <button className="primary-btn" onClick={onBack}>
              Back to login
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordScreen;
