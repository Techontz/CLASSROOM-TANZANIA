import type { GuardianLink, LinkedStudent, ServiceError } from "@/types";
import { api, toServiceError } from "./api-client";

// ---------------------------------------------------------------------------
// Parent / teacher (guardian) access.
//
// The code is generated and validated entirely on the server. A guardian can
// only ever learn a code from the student who issued it: there is no endpoint
// that lists, searches or validates codes, and claiming answers every failure
// with the same message so it cannot be used to probe the code space.
// ---------------------------------------------------------------------------

/** POST /api/guardian/invite */
export async function createGuardianInviteCode(
  relationship: string,
): Promise<{ code?: string; error?: string }> {
  try {
    const result = await api.post<{ code: string; link: GuardianLink }>("/guardian/invite", {
      relationship,
    });
    return { code: result.code };
  } catch (error) {
    return { error: toServiceError(error, "Couldn't generate a code. Please try again.").message };
  }
}

/** GET /api/guardian/invites — the student's own links, and nobody else's. */
export async function fetchGuardianLinks(): Promise<GuardianLink[]> {
  try {
    return await api.get<GuardianLink[]>("/guardian/invites");
  } catch {
    return [];
  }
}

/** DELETE /api/guardian/invites/{link} */
export async function revokeGuardianLink(linkId: string): Promise<ServiceError | null> {
  try {
    await api.delete(`/guardian/invites/${linkId}`);
    return null;
  } catch (error) {
    return toServiceError(error, "Couldn't revoke that access.");
  }
}

/** POST /api/guardian/claim */
export async function claimGuardianCode(
  code: string,
): Promise<{ success?: boolean; error?: string }> {
  try {
    await api.post<LinkedStudent>("/guardian/claim", { code });
    return { success: true };
  } catch (error) {
    return {
      error: toServiceError(error, "That code is invalid or has already been used.").message,
    };
  }
}

/** GET /api/guardian/students */
export async function fetchLinkedStudents(): Promise<LinkedStudent[]> {
  try {
    return await api.get<LinkedStudent[]>("/guardian/students");
  } catch {
    return [];
  }
}

/** DELETE /api/guardian/students/{student} */
export async function unlinkStudent(studentId: string): Promise<ServiceError | null> {
  try {
    await api.delete(`/guardian/students/${studentId}`);
    return null;
  } catch (error) {
    return toServiceError(error, "Couldn't remove that student.");
  }
}
