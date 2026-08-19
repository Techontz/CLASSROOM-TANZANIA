import type { ContentCatalog } from "@/types";
import { api } from "@/services/api-client";
import { setSubjects } from "@/data/subjects";
import { setTopics } from "@/data/topics";
import { setQuizzes } from "@/data/quizzes";
import { setPastPapers } from "@/data/past-papers";
import { setDownloads } from "@/data/downloads";
import { setTermsSections } from "@/data/terms";
import { rebuildSearchIndex } from "@/lib/search";

// ---------------------------------------------------------------------------
// Content hydration.
//
// MySQL is the source of truth for subjects, topics, tests, past papers,
// downloads and the terms text. The UI reads all of it synchronously from
// module scope — the search index is built at import, the subject grid and the
// quiz screen index straight into the maps — so the catalogue is fetched once
// at boot and written into those modules before the first screen renders,
// rather than being fetched per screen.
//
// The literals still in src/data are the offline fallback: if the API can't be
// reached, the app runs on the content it shipped with instead of showing an
// empty shell.
// ---------------------------------------------------------------------------

const CACHE_KEY = "classroom-tz:catalog";

/** Bump when the catalogue's shape changes, to discard stale cached copies. */
const CACHE_VERSION = 1;

interface CachedCatalog {
  version: number;
  fetchedAt: number;
  includesAnswers: boolean;
  catalog: ContentCatalog;
}

export interface HydrationResult {
  source: "api" | "cache" | "fallback";
  includesAnswers: boolean;
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/** Writes the catalogue into the data modules and rebuilds the search index. */
export function applyCatalog(catalog: ContentCatalog): void {
  setSubjects(catalog.subjects, catalog.subjectBadges ?? {});
  setTopics(catalog.topics ?? {});
  setQuizzes(catalog.quizzes ?? {});
  setPastPapers(catalog.pastPapers ?? {});
  setDownloads(catalog.downloads ?? []);
  setTermsSections(catalog.terms ?? []);
  rebuildSearchIndex();
}

function readCache(): CachedCatalog | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedCatalog;
    return parsed?.version === CACHE_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

function writeCache(catalog: ContentCatalog): void {
  if (!isBrowser()) return;
  try {
    const payload: CachedCatalog = {
      version: CACHE_VERSION,
      fetchedAt: Date.now(),
      includesAnswers: catalog.includesAnswers,
      catalog,
    };
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // The cache is an optimisation; a full quota must not break the app.
  }
}

export function clearCatalogCache(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(CACHE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Fetches the catalogue and hydrates the data modules.
 *
 * A signed-out request gets a catalogue without the answer keys, so the app
 * refetches after signing in. `needsAnswers` says which of the two is wanted;
 * a cached copy is only reused when it is at least as complete.
 */
export async function hydrateContent(needsAnswers: boolean): Promise<HydrationResult> {
  const cached = readCache();

  try {
    const catalog = await api.get<ContentCatalog>("/content/catalog");
    applyCatalog(catalog);
    writeCache(catalog);
    return { source: "api", includesAnswers: catalog.includesAnswers };
  } catch {
    // Offline, or the API is down. Fall back to the last good copy, then to
    // the content that shipped with the app.
    if (cached && (cached.includesAnswers || !needsAnswers)) {
      applyCatalog(cached.catalog);
      return { source: "cache", includesAnswers: cached.includesAnswers };
    }
    rebuildSearchIndex();
    return { source: "fallback", includesAnswers: true };
  }
}
