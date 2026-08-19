"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import PasswordField from "@/components/ui/PasswordField";
import ScreenHeader from "@/components/layout/ScreenHeader";
import TermsScreen from "./TermsScreen";
import LevelCascadeFields from "./LevelCascadeFields";
import { COLLEGE_OPTION, composeLevel } from "@/lib/level";
import { useSession } from "@/components/layout/SessionProvider";
import { signUp } from "@/services/auth";

/** Signup, including the student vs parent/teacher role toggle. Ported 1:1. */
export function CreateAccountScreen() {
  const router = useRouter();
  const { signIn } = useSession();

  const [accountType, setAccountType] = useState<"student" | "guardian">("student");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("Form 1-4");
  const [collegeLevel, setCollegeLevel] = useState("");
  const [faculty, setFaculty] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const isStudent = accountType === "student";
  const isCollege = level === COLLEGE_OPTION;
  const collegeComplete = !isStudent || !isCollege || Boolean(collegeLevel && faculty);
  const canSubmit =
    name.trim().length >= 2 &&
    contact.trim().length > 3 &&
    password.trim().length >= 6 &&
    agreed &&
    collegeComplete &&
    !loading;

  function onBack() {
    router.push("/login");
  }

  if (showTerms) {
    return <TermsScreen onBack={() => setShowTerms(false)} />;
  }

  if (needsConfirmation) {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <ScreenHeader title="Almost there" />
        <div style={{ padding: "8px 20px 24px" }}>
          <div className="score-circle" style={{ margin: "8px auto 16px" }}>
            <Icon name="mail" size={22} />
          </div>
          <p className="results-line1" style={{ textAlign: "center" }}>
            Confirm your email
          </p>
          <p className="footnote" style={{ margin: "8px 0 20px" }}>
            We&apos;ve sent a confirmation link to {contact}. Open it to activate your account, then
            come back and log in.
          </p>
          <button className="primary-btn" onClick={onBack}>
            Back to login
          </button>
        </div>
      </div>
    );
  }

  async function handleCreateAccount() {
    setErrorMsg("");
    setLoading(true);
    const finalLevel = isStudent ? composeLevel(level, collegeLevel, faculty) : "Guardian";
    const result = await signUp({
      email: contact.trim(),
      password,
      name: name.trim(),
      level: finalLevel,
      role: isStudent ? "student" : "guardian",
    });
    setLoading(false);

    if (result.error) {
      setErrorMsg(result.error.message || "Couldn't create that account.");
      return;
    }

    if (result.data) {
      await signIn(result.data);
      router.replace(result.data.role === "guardian" ? "/guardian" : "/dashboard");
    } else {
      setNeedsConfirmation(true);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader title="Create account" onBack={onBack} />
      <div style={{ padding: "8px 20px 24px" }}>
        <div className="role-toggle">
          <button
            className={"role-toggle-btn" + (isStudent ? " active" : "")}
            onClick={() => setAccountType("student")}
          >
            I&apos;m a student
          </button>
          <button
            className={"role-toggle-btn" + (!isStudent ? " active" : "")}
            onClick={() => setAccountType("guardian")}
          >
            I&apos;m a parent / teacher
          </button>
        </div>

        {!isStudent && (
          <p className="footnote" style={{ textAlign: "left", margin: "0 0 16px" }}>
            You&apos;ll get a read-only view of your child or student&apos;s progress once they
            share an access code with you from their own account.
          </p>
        )}

        <label className="field-label">{isStudent ? "Jina lako / Your name" : "Your name"}</label>
        <input
          className="text-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Amina Juma"
          autoComplete="name"
        />

        <label className="field-label">Email</label>
        <input
          className="text-input"
          type="email"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="e.g. amina@example.com"
          autoComplete="username"
        />

        <label className="field-label">Password</label>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />

        {isStudent && (
          <LevelCascadeFields
            level={level}
            setLevel={setLevel}
            collegeLevel={collegeLevel}
            setCollegeLevel={setCollegeLevel}
            faculty={faculty}
            setFaculty={setFaculty}
          />
        )}

        <label className="terms-row">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            I agree to the{" "}
            <button
              type="button"
              className="link-btn-inline"
              onClick={() => setShowTerms(true)}
            >
              Terms &amp; Conditions and Privacy Notice
            </button>
            .
            {isStudent && (
              <Fragment>
                {" "}
                If you&apos;re under 18, please review this with a parent or guardian first.
              </Fragment>
            )}
          </span>
        </label>

        {errorMsg && (
          <p className="incomplete-warning" style={{ margin: "-6px 0 14px" }}>
            {errorMsg}
          </p>
        )}

        <button className="primary-btn" disabled={!canSubmit} onClick={handleCreateAccount}>
          {loading ? "Creating account..." : "Create account"}
        </button>

        <div className="inline-link-row" style={{ justifyContent: "center", marginTop: "14px" }}>
          <span className="footnote" style={{ margin: 0 }}>
            Already have an account?&nbsp;
          </span>
          <button className="link-btn" onClick={onBack}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountScreen;
