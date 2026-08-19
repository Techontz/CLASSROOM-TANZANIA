import type { Profile, ServiceError } from "@/types";
import { api, toServiceError } from "./api-client";

// ---------------------------------------------------------------------------
// Profile.
//
// Avatars are uploaded to the API, which stores them on the configured
// filesystem disk (local in development, S3 / R2 / a CDN in production) and
// returns the public URL.
// ---------------------------------------------------------------------------

/** GET /api/profile */
export async function fetchProfile(): Promise<Profile | null> {
  try {
    return await api.get<Profile>("/profile");
  } catch {
    return null;
  }
}

/** PUT /api/profile { name } */
export async function updateProfileName(name: string): Promise<ServiceError | null> {
  try {
    await api.put<Profile>("/profile", { name });
    return null;
  } catch (error) {
    return toServiceError(error, "Couldn't save your name. Please try again.");
  }
}

/** PUT /api/profile { level } */
export async function updateProfileLevel(level: string): Promise<ServiceError | null> {
  try {
    await api.put<Profile>("/profile", { level });
    return null;
  } catch (error) {
    return toServiceError(error, "Couldn't save your level. Please try again.");
  }
}

/** POST /api/profile/avatar (multipart) */
export async function uploadAvatar(
  file: File,
): Promise<{ publicUrl?: string; error?: ServiceError }> {
  try {
    const form = new FormData();
    form.append("avatar", file);
    const result = await api.post<{ publicUrl: string }>("/profile/avatar", form);
    return { publicUrl: result.publicUrl };
  } catch (error) {
    return { error: toServiceError(error, "Couldn't upload that image. Please try again.") };
  }
}
