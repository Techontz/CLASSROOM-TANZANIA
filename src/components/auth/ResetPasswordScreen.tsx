"use client";

import { Fragment, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Icon from "@/components/ui/Icon";
import PasswordField from "@/components/ui/PasswordField";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { resetPassword } from "@/services/auth";

/**
 * Where the emailed reset link lands.
 *
 * The API builds the link as {FRONTEND_URL}/reset-password?token=…&email=…, so
 * this screen exists to complete the flow the "Forgot password?" screen starts.
 * Copy and controls follow the existing auth screens.
 */
export function ResetPasswordScreen() {
  const router = useRouter();
  const params = useSearchParams();

  const token = params.get("token") ?? "";
  const email = params.get("email") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [done, setDone] = useState(false);

  function onBack() {
    router.push("/login");
  }

  async function handleSubmit() {
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match.");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    const { error } = await resetPassword({ token, email, password });
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setDone(true);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader title="Set a new password" onBack={onBack} />
      <div style={{ padding: "8px 20px 24px" }}>
        {!token && !done && (
          <Fragment>
            <p className="incomplete-warning" style={{ margin: "0 0 14px" }}>
              This reset link is incomplete. Please open the link from your email again.
            </p>
            <button className="primary-btn" onClick={onBack}>
              Back to login
            </button>
          </Fragment>
        )}

        {token && !done && (
          <Fragment>
            <p className="footnote" style={{ textAlign: "left", margin: "0 0 16px" }}>
              Choose a new password for {email}.
            </p>

            <label className="field-label">New password</label>
            <PasswordField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />

            <label className="field-label">Confirm new password</label>
            <PasswordField
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              autoComplete="new-password"
            />

            {errorMsg && (
              <p className="incomplete-warning" style={{ margin: "-6px 0 14px" }}>
                {errorMsg}
              </p>
            )}

            <button
              className="primary-btn"
              disabled={loading || !password || !confirmPassword}
              onClick={handleSubmit}
            >
              {loading ? "Saving..." : "Save new password"}
            </button>
          </Fragment>
        )}

        {done && (
          <Fragment>
            <div className="score-circle" style={{ margin: "8px auto 16px" }}>
              <Icon name="check" size={24} />
            </div>
            <p className="results-line1" style={{ textAlign: "center" }}>
              Password updated
            </p>
            <p className="footnote" style={{ margin: "8px 0 20px" }}>
              You can now log in with your new password.
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

export default ResetPasswordScreen;
