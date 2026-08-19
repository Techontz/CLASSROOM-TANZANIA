"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import type { BookmarkType } from "@/types";
import { addBookmark, isBookmarked, removeBookmark } from "@/services/bookmarks";

export interface BookmarkButtonProps {
  userId: string | null;
  type: BookmarkType;
  title: string;
  subtitle: string;
  subjectId: string | null;
  subjectName: string;
  deepLink: string;
  size?: number;
}

/** Toggle bookmark icon. Ported 1:1 from index.html, service calls swapped in. */
export function BookmarkButton({
  userId,
  type,
  title,
  subtitle,
  subjectId,
  subjectName,
  deepLink,
  size,
}: BookmarkButtonProps) {
  const [bookmarkId, setBookmarkId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let active = true;
    if (userId && deepLink) {
      isBookmarked(deepLink).then((id) => {
        if (active) setBookmarkId(id);
      });
    }
    return () => {
      active = false;
    };
  }, [deepLink, userId]);

  async function toggle() {
    if (busy) return;
    if (!userId) {
      console.error("Bookmark: no logged-in user id available yet.");
      setHasError(true);
      return;
    }
    setBusy(true);
    setHasError(false);
    if (bookmarkId) {
      const err = await removeBookmark(bookmarkId);
      if (err) {
        console.error("Bookmark: failed to remove.", err);
        setHasError(true);
      } else {
        setBookmarkId(null);
      }
    } else {
      const result = await addBookmark(
        type,
        title,
        subtitle,
        subjectId,
        subjectName,
        deepLink,
      );
      if (result.error) {
        console.error("Bookmark: failed to save.", result.error);
        setHasError(true);
      } else if (result.id) {
        setBookmarkId(result.id);
      }
    }
    setBusy(false);
  }

  return (
    <button
      className={"nav-arrow-btn" + (hasError ? " bookmark-error" : "")}
      onClick={toggle}
      aria-label={bookmarkId ? "Remove bookmark" : "Save bookmark"}
      title={hasError ? "Couldn't save. Check your connection and try again." : undefined}
    >
      <Icon name={bookmarkId ? "bookmarkFilled" : "bookmark"} size={size || 16} />
    </button>
  );
}

export default BookmarkButton;
