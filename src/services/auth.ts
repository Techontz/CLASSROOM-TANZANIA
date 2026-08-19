import type { AuthPayload, Profile, ServiceError, UserRole } from "@/types";
import { ApiError, api, getAuthToken, setAuthToken, toServiceError } from "./api-client";

// ---------------------------------------------------------------------------
// Authentication — Laravel Sanctum.
//
// Passwords are hashed and verified server-side; nothing but the bearer token
// is kept on the client, and that only so a reload doesn't sign the user out.
// ---------------------------------------------------------------------------

interface AuthResponse {
  token: string;
  user: AuthPayload;
}

/** POST /api/auth/login */
export async function signIn(
  email: string,
  password: string,
): Promise<{ data?: AuthPayload; error?: ServiceError }> {
  try {
    const result = await api.post<AuthResponse>("/auth/login", { email, password });
    setAuthToken(result.token);
    return { data: result.user };
  } catch (error) {
    return { error: toServiceError(error, "Couldn't log in. Check your email and password.") };
  }
}

/** POST /api/auth/register */
export async function signUp(params: {
  email: string;
  password: string;
  name: string;
  level: string;
  role: UserRole;
}): Promise<{ data?: AuthPayload; needsConfirmation?: boolean; error?: ServiceError }> {
  try {
    const result = await api.post<AuthResponse>("/auth/register", params);
    setAuthToken(result.token);
    return { data: result.user };
  } catch (error) {
    return { error: toServiceError(error, "Couldn't create that account.") };
  }
}

/**
 * GET /api/auth/me — restores the logged-in user on page load.
 *
 * A 401 means the stored token is gone or expired, so it is discarded rather
 * than left to fail every later call.
 */
export async function getSession(): Promise<AuthPayload | null> {
  if (!getAuthToken()) return null;
  try {
    const result = await api.get<{ user: AuthPayload }>("/auth/me");
    return result.user;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      setAuthToken(null);
    }
    return null;
  }
}

/** GET /api/profile */
export async function fetchProfile(): Promise<Profile | null> {
  try {
    return await api.get<Profile>("/profile");
  } catch {
    return null;
  }
}

/** POST /api/auth/logout */
export async function signOut(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    // Even if the call fails, the local session ends.
  } finally {
    setAuthToken(null);
  }
}

/** POST /api/auth/forgot-password */
export async function resetPasswordForEmail(email: string): Promise<{ error?: ServiceError }> {
  try {
    await api.post("/auth/forgot-password", { email });
    return {};
  } catch (error) {
    return { error: toServiceError(error, "Something went wrong sending that email.") };
  }
}

/** POST /api/auth/reset-password */
export async function resetPassword(params: {
  token: string;
  email: string;
  password: string;
}): Promise<{ error?: ServiceError }> {
  try {
    await api.post("/auth/reset-password", {
      ...params,
      password_confirmation: params.password,
    });
    return {};
  } catch (error) {
    return { error: toServiceError(error, "That reset link is invalid or has expired.") };
  }
}

/** PUT /api/auth/password */
export async function updatePassword(newPassword: string): Promise<{ error?: ServiceError }> {
  try {
    await api.put("/auth/password", { password: newPassword });
    return {};
  } catch (error) {
    return { error: toServiceError(error, "Couldn't update your password.") };
  }
}

/** DELETE /api/profile */
export async function deleteAccount(): Promise<{ error?: ServiceError }> {
  try {
    await api.delete("/profile");
    setAuthToken(null);
    return {};
  } catch (error) {
    return { error: toServiceError(error, "Couldn't delete your account. Please try again.") };
  }
}
