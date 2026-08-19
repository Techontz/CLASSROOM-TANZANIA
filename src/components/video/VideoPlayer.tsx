"use client";

import { useEffect, useRef } from "react";
import type { LessonVideo } from "@/types";
import { saveVideoProgress } from "@/services/videos";

/**
 * Video player.
 *
 * The API hands back a resolved URL: a direct file/CDN URL for uploads and
 * external links, or an embed URL for YouTube/Vimeo. Nothing streams through
 * the Laravel process, so playback scales with storage rather than with PHP.
 *
 * Position is reported on a timer rather than on every `timeupdate` (which
 * fires several times a second), and once more when the tab is left, so a
 * student who closes the page mid-lesson still resumes where they stopped.
 */
const REPORT_INTERVAL_MS = 10_000;

export function VideoPlayer({ video }: { video: LessonVideo }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const lastReported = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Resume where the student left off.
    const resumeAt = video.progress?.positionSeconds ?? 0;
    if (resumeAt > 0 && Number.isFinite(resumeAt)) {
      element.currentTime = resumeAt;
    }

    function report(completed = false) {
      const el = ref.current;
      if (!el) return;
      const position = Math.floor(el.currentTime || 0);
      const duration = Math.floor(el.duration || video.durationSeconds || 0);
      if (!completed && position === lastReported.current) return;
      lastReported.current = position;
      void saveVideoProgress(video.id, position, duration, completed);
    }

    const timer = window.setInterval(() => report(), REPORT_INTERVAL_MS);
    const onEnded = () => report(true);
    const onPause = () => report();
    const onHide = () => {
      if (document.visibilityState === "hidden") report();
    };

    element.addEventListener("ended", onEnded);
    element.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onHide);

    return () => {
      window.clearInterval(timer);
      element.removeEventListener("ended", onEnded);
      element.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onHide);
      report();
    };
  }, [video.id, video.durationSeconds, video.progress?.positionSeconds]);

  if (video.isEmbed) {
    // Hosted players report their own progress internally; the lesson can still
    // be marked complete by hand from the lesson screen.
    return (
      <div className="video-frame">
        <iframe
          src={video.url}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="video-frame">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src={video.url}
        poster={video.thumbnailUrl ?? undefined}
        controls
        playsInline
        preload="metadata"
      />
    </div>
  );
}

export default VideoPlayer;
