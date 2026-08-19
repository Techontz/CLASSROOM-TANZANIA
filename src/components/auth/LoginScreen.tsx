"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import PasswordField from "@/components/ui/PasswordField";
import TermsScreen from "./TermsScreen";
import { useSession } from "@/components/layout/SessionProvider";
import { signIn as signInService } from "@/services/auth";

/** Login. Layout, copy and validation rules unchanged from index.html. */
export function LoginScreen() {
  const router = useRouter();
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  const canSubmit = email.trim().length > 3 && password.trim().length > 0 && !loading;

  if (showTerms) {
    return <TermsScreen onBack={() => setShowTerms(false)} />;
  }

  async function handleLogin() {
    setErrorMsg("");
    setLoading(true);
    const { data, error } = await signInService(email.trim(), password);
    if (error || !data) {
      setLoading(false);
      setErrorMsg(error?.message || "Couldn't log in. Check your email and password.");
      return;
    }
    await signIn(data);
    setLoading(false);
    router.replace(data.role === "guardian" ? "/guardian" : "/dashboard");
  }

  return (
    <div className="login-wrap">
      <div className="brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon-192.png" alt="Classroom Tanzania" className="brand-badge" />
        <h1>Classroom Tanzania</h1>
        <p>Jifunze, fanya mtihani, fanikiwa · Tanzania Mainland &amp; Zanzibar</p>
      </div>

      <label className="field-label">Email</label>
      <input
        className="text-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="e.g. amina@example.com"
        autoComplete="username"
      />

      <label className="field-label">Password</label>
      <PasswordField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        autoComplete="current-password"
        onKeyDown={(e) => {
          if (e.key === "Enter" && canSubmit) handleLogin();
        }}
      />

      {errorMsg && (
        <p className="incomplete-warning" style={{ margin: "-6px 0 14px" }}>
          {errorMsg}
        </p>
      )}

      <div className="inline-link-row">
        <button className="link-btn" onClick={() => router.push("/forgot-password")}>
          Forgot password?
        </button>
      </div>

      <button className="primary-btn" disabled={!canSubmit} onClick={handleLogin}>
        {loading ? "Logging in..." : "Ingia / Log in"}
      </button>

      <div className="divider-row">
        <span>or</span>
      </div>

      <button className="outline-btn" onClick={() => router.push("/register")}>
        Create account
      </button>

      <p className="footnote">
        By continuing you agree to our{" "}
        <button type="button" className="link-btn-inline" onClick={() => setShowTerms(true)}>
          Terms &amp; Conditions
        </button>
        .
      </p>

      <div className="support-line">
        <Icon name="phone" size={13} />
        <span>
          Need help? Call/WhatsApp +255 759 5861256 or email support@classroomtanzania.com
        </span>
      </div>
    </div>
  );
}

export default LoginScreen;
