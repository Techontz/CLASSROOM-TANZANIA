import type { DownloadItem } from "@/types";

/**
 * Extracted verbatim from the original index.html (DOWNLOADS).
 * `file` refers to a PDF served from /public.
 */
export const SEED_DOWNLOADS: DownloadItem[] = [{
  id: "bio-f2-2024-pdf",
  subject: "Biology",
  title: "Form Two National Assessment 2024",
  type: "Past paper",
  board: "NECTA",
  file: "Biology-Form2-NECTA-2024.pdf"
}, {
  id: "geo-f4-2026-dar-pdf",
  subject: "Geography",
  title: "Mock form iv 2026 - Dar",
  type: "Mock exam",
  board: "Dar es Salaam Region (PMO-RALG)",
  file: "Geography-FormFour-MockExam-2026-Dar.pdf"
}];

export let DOWNLOADS: DownloadItem[] = SEED_DOWNLOADS;

/** Called by the content store once the catalogue has been fetched. */
export function setDownloads(downloads: DownloadItem[]): void {
  DOWNLOADS = downloads;
}
