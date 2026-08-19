"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import Icon from "@/components/ui/Icon";
import PasswordField from "@/components/ui/PasswordField";
import ShareActions from "@/components/ui/ShareActions";
import ScreenHeader from "@/components/layout/ScreenHeader";
import GuardianAccessManager from "@/components/guardian/GuardianAccessManager";
import { useSession } from "@/components/layout/SessionProvider";
import { buildShareUrl } from "@/lib/deep-links";
import { updateProfileName, uploadAvatar } from "@/services/profile";
import { deleteAccount as deleteAccountService, updatePassword } from "@/services/auth";

type AccountView = "menu" | "editProfile" | "guardianAccess" | "subscription" | "deleteConfirm";

/**
 * Account / settings. Ported 1:1 from index.html `AccountScreen`, including its
 * internal sub-view switch. Kept as one component so every sub-screen keeps the
 * exact back-navigation behaviour it had (back returns to the account menu, not
 * to the previous route).
 */
export function AccountScreen() {
  const router = useRouter();
  const { student, signOut, deleteAccount, updateStudent } = useSession();

  const [view, setView] = useState<AccountView>("menu");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [nameInput, setNameInput] = useState(student.name);
  const [nameSaving, setNameSaving] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);
  const [nameError, setNameError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(student.avatarUrl || "");
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState("");

  async function handleSaveName() {
    if (!nameInput.trim() || !student.userId) return;
    setNameSaving(true);
    setNameError("");
    setNameSaved(false);
    const error = await updateProfileName(nameInput.trim());
    setNameSaving(false);
    if (error) {
      setNameError("Couldn't save your name. Please try again.");
      return;
    }
    updateStudent({ name: nameInput.trim() });
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 1800);
  }

  async function handleSavePassword() {
    if (newPassword.length < 6) {
      setPwError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Passwords don't match.");
      return;
    }
    setPwSaving(true);
    setPwError("");
    setPwSaved(false);
    const { error } = await updatePassword(newPassword);
    setPwSaving(false);
    if (error) {
      setPwError(error.message || "Couldn't update your password.");
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 1800);
  }

  async function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file || !student.userId) return;
    if (file.size > 3 * 1024 * 1024) {
      setAvatarError("Please choose an image under 3MB.");
      return;
    }
    setAvatarError("");
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarUploading(true);
    const result = await uploadAvatar(file);
    setAvatarUploading(false);
    if (result.error) {
      setAvatarError("Couldn't upload that image. Please try again.");
      return;
    }
    updateStudent({ avatarUrl: result.publicUrl ?? "" });
  }

  async function confirmDelete() {
    setDeleteError("");
    setDeleting(true);
    try {
      const { error } = await deleteAccountService();
      if (error) {
        setDeleting(false);
        setDeleteError(error.message || "Couldn't delete your account. Please try again.");
        return;
      }
      await deleteAccount();
      router.replace("/login");
    } catch {
      setDeleting(false);
      setDeleteError("Couldn't reach the server. Check your connection and try again.");
    }
  }

  async function handleLogout() {
    await signOut();
    router.replace("/login");
  }

  // ---- sub-views ----

  if (view === "guardianAccess" && student.userId) {
    return <GuardianAccessManager onBack={() => setView("menu")} />;
  }

  if (view === "editProfile") {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <ScreenHeader title="Edit profile" onBack={() => setView("menu")} />
        <div style={{ padding: "8px 16px 24px", flex: 1, overflowY: "auto" }}>
          <div className="avatar-edit-row">
            <div className="avatar-large">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarPreview} alt="" className="avatar-img" />
              ) : (
                (student.name || "?").charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <label className="outline-btn avatar-upload-btn">
                {avatarUploading ? "Uploading..." : "Change photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  disabled={avatarUploading}
                  style={{ display: "none" }}
                />
              </label>
              {avatarError && (
                <p className="incomplete-warning" style={{ margin: "8px 0 0" }}>
                  {avatarError}
                </p>
              )}
            </div>
          </div>

          <p className="section-title" style={{ margin: "18px 0 8px" }}>
            Name
          </p>
          <input
            className="text-input"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Your name"
          />
          {nameError && (
            <p className="incomplete-warning" style={{ margin: "-6px 0 14px" }}>
              {nameError}
            </p>
          )}
          <button
            className="primary-btn"
            disabled={nameSaving || !nameInput.trim()}
            onClick={handleSaveName}
          >
            {nameSaving ? "Saving..." : nameSaved ? "Saved!" : "Save name"}
          </button>

          <p className="section-title" style={{ margin: "22px 0 8px" }}>
            Change password
          </p>
          <label className="field-label">New password</label>
          <PasswordField
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
          {pwError && (
            <p className="incomplete-warning" style={{ margin: "-6px 0 14px" }}>
              {pwError}
            </p>
          )}
          <button
            className="primary-btn"
            disabled={pwSaving || !newPassword}
            onClick={handleSavePassword}
          >
            {pwSaving ? "Saving..." : pwSaved ? "Saved!" : "Update password"}
          </button>
        </div>
      </div>
    );
  }

  if (view === "subscription") {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <ScreenHeader title="Subscription" onBack={() => setView("menu")} />
        <div style={{ padding: "8px 16px 16px" }}>
          <div className="sub-plan-card">
            <p className="sub-plan-name">Free plan</p>
            <p className="sub-plan-desc">
              You currently have full access to all subjects, tests, and past papers at no cost.
            </p>
          </div>
          <p className="footnote" style={{ textAlign: "left", marginTop: "14px" }}>
            Paid plans aren&apos;t available yet. When they launch, you&apos;ll be able to manage
            your subscription right here.
          </p>
        </div>
      </div>
    );
  }

  if (view === "deleteConfirm") {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <ScreenHeader title="Delete account" onBack={() => setView("menu")} />
        <div style={{ padding: "8px 16px 16px" }}>
          <p className="delete-warning-title">Are you sure?</p>
          <p className="footnote" style={{ textAlign: "left" }}>
            This permanently deletes your account, including your profile, quiz scores, past paper
            attempts, and reading progress. This cannot be undone.
          </p>
          {deleteError && (
            <p className="incomplete-warning" style={{ margin: "10px 0 0" }}>
              {deleteError}
            </p>
          )}
          <button
            className="primary-btn"
            style={{ background: "#dc2626", marginTop: "16px" }}
            disabled={deleting}
            onClick={confirmDelete}
          >
            {deleting ? "Deleting..." : "Yes, delete my account"}
          </button>
          <button
            className="outline-btn"
            style={{ marginTop: "8px" }}
            disabled={deleting}
            onClick={() => setView("menu")}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ---- main menu ----

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader title="Account" onBack={() => router.push("/dashboard")} />
      <div style={{ padding: "4px 16px 16px" }}>
        <div className="account-summary">
          <div className="avatar" style={{ width: "44px", height: "44px", fontSize: "16px" }}>
            {student.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={student.avatarUrl} alt="" className="avatar-img" />
            ) : (
              (student.name || "?").charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <p className="account-name">{student.name}</p>
            <p className="account-level">{student.level}</p>
          </div>
        </div>

        <div className="account-menu">
          <button className="account-menu-item" onClick={() => setView("editProfile")}>
            <Icon name="userPlus" size={16} />
            <span className="account-menu-label">Edit profile</span>
            <Icon name="chevronRight" size={16} />
          </button>

          <button className="account-menu-item" onClick={() => setView("guardianAccess")}>
            <Icon name="share" size={16} />
            <span className="account-menu-label">Parent &amp; Teacher Access</span>
            <Icon name="chevronRight" size={16} />
          </button>

          <button className="account-menu-item" onClick={handleLogout}>
            <Icon name="logOut" size={16} />
            <span className="account-menu-label">Log out</span>
            <Icon name="chevronRight" size={16} />
          </button>

          <button className="account-menu-item" onClick={() => setView("subscription")}>
            <Icon name="crown" size={16} />
            <span className="account-menu-label">Subscription</span>
            <Icon name="chevronRight" size={16} />
          </button>

          <div>
            <button className="account-menu-item" onClick={() => setInviteOpen((o) => !o)}>
              <Icon name="userPlus" size={16} />
              <span className="account-menu-label">Invite people</span>
              <Icon name={inviteOpen ? "chevronLeft" : "chevronRight"} size={16} />
            </button>
            {inviteOpen && (
              <div className="invite-panel">
                <ShareActions
                  url={buildShareUrl("")}
                  message="Join me on Classroom Tanzania — study NECTA & ZEC subjects, tests, and past papers."
                />
              </div>
            )}
          </div>

          <button
            className="account-menu-item account-menu-danger"
            onClick={() => {
              setDeleteError("");
              setView("deleteConfirm");
            }}
          >
            <Icon name="trash" size={16} />
            <span className="account-menu-label">Delete account</span>
            <Icon name="chevronRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountScreen;
