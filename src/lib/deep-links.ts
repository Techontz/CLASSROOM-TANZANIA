import type { DeepLink } from "@/types";

// ---------------------------------------------------------------------------
// Deep linking.
//
// The original app encoded a subject/topic/quiz/paper as a URL #hash. That
// exact format is preserved here, for two reasons:
//   1. Links already shared with students keep working.
//   2. Bookmarks persist a `deep_link` string in this format, so the shape a
//      future backend stores is unchanged.
//
// `deepLinkToRoute` maps that hash onto the App Router path, and
// <DeepLinkRedirect> (in components/layout) performs the redirect on load.
// ---------------------------------------------------------------------------

/** Ported unchanged from index.html `buildShareUrl`. */
export function buildShareUrl(hashPath: string): string {
  try {
    const base = window.location.origin + "/";
    return hashPath ? base + "#" + hashPath : base;
  } catch {
    return hashPath ? "#" + hashPath : "";
  }
}

/** Ported unchanged from index.html `parseShareHash`. */
export function parseShareHash(hash: string): DeepLink | null {
  const clean = (hash || "").replace(/^#/, "");
  if (!clean) return null;
  const parts = clean.split("/");
  if (parts[0] === "subject" && parts[1]) {
    return { type: "subject", subjectId: parts[1] };
  }
  if (parts[0] === "topic" && parts[1] && parts[2]) {
    return { type: "topic", subjectId: parts[1], topicId: parts[2] };
  }
  if (parts[0] === "quiz" && parts[1] && parts[2] !== undefined) {
    return { type: "quiz", subjectId: parts[1], testIndex: parseInt(parts[2], 10) || 0 };
  }
  if (parts[0] === "paper" && parts[1]) {
    return { type: "paper", paperId: parts[1] };
  }
  return null;
}

/** Translate a parsed deep link into the App Router path that renders it. */
export function deepLinkToRoute(link: DeepLink): string {
  switch (link.type) {
    case "subject":
      return `/subjects/${link.subjectId}`;
    case "topic":
      return `/subjects/${link.subjectId}/topics/${link.topicId}`;
    case "quiz":
      return `/quizzes/${link.subjectId}/${link.testIndex}`;
    case "paper":
      return `/papers/${link.paperId}`;
  }
}

/** Convenience: hash path string ("topic/bio/b1") straight to a route. */
export function hashPathToRoute(hashPath: string): string | null {
  const parsed = parseShareHash(hashPath);
  return parsed ? deepLinkToRoute(parsed) : null;
}
