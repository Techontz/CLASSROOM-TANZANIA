import type { Bookmark, BookmarkType, ServiceError } from "@/types";
import { api, toServiceError } from "./api-client";

// ---------------------------------------------------------------------------
// Bookmarks ("My Shelf").
//
// The 30-day expiry now lives in the database as an `expires_at` column, and
// the API drops expired rows when the shelf is read — the same lazy cleanup the
// original performed, just on the server.
// ---------------------------------------------------------------------------

/** GET /api/bookmarks?deep_link=... — returns the id if this item is saved. */
export async function isBookmarked(deepLink: string): Promise<string | null> {
  try {
    const items = await api.get<Bookmark[]>(
      `/bookmarks?deep_link=${encodeURIComponent(deepLink)}`,
    );
    return items.length > 0 ? items[0].id : null;
  } catch {
    return null;
  }
}

/** POST /api/bookmarks */
export async function addBookmark(
  type: BookmarkType,
  title: string,
  subtitle: string,
  subjectId: string | null,
  subjectName: string,
  deepLink: string,
): Promise<{ id?: string; error?: ServiceError }> {
  try {
    const bookmark = await api.post<Bookmark>("/bookmarks", {
      type,
      title,
      subtitle,
      subject_id: subjectId,
      subject_name: subjectName,
      deep_link: deepLink,
    });
    return { id: bookmark.id };
  } catch (error) {
    return { error: toServiceError(error, "Couldn't save that bookmark.") };
  }
}

/** DELETE /api/bookmarks/{bookmark} */
export async function removeBookmark(bookmarkId: string): Promise<ServiceError | null> {
  try {
    await api.delete(`/bookmarks/${bookmarkId}`);
    return null;
  } catch (error) {
    return toServiceError(error, "Couldn't remove that bookmark.");
  }
}

/** GET /api/bookmarks */
export async function fetchBookmarks(): Promise<Bookmark[]> {
  try {
    return await api.get<Bookmark[]>("/bookmarks");
  } catch {
    return [];
  }
}
