import type { ReactElement } from "react";

// ---------------------------------------------------------------------------
// The complete icon set, ported 1:1 from index.html.
//
// Every path is hand-drawn inline SVG — the original used no icon library or
// font, and neither does this. Path data is unchanged.
//
// One note: the original had a second, unreachable `eye` branch after `play`
// using a slightly different path. Because the earlier `eye` branch always won,
// that dead branch never rendered and has not been carried over.
// ---------------------------------------------------------------------------

const STROKE_PATHS: Record<string, string> = {
  chevronLeft: "M15 18l-6-6 6-6",
  chevronRight: "M9 18l6-6-6-6",
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  download: "M12 3v12m0 0-4-4m4 4 4-4M4 21h16",
  fileText: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M9 13h6M9 17h6",
  eye: "M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z",
  eyeOff:
    "M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.6 21.6 0 0 1 5.06-5.94M9.9 4.24A10.4 10.4 0 0 1 12 4c7 0 11 7 11 7a21.6 21.6 0 0 1-2.16 3.19M1 1l22 22",
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  notebook: "M4 4h13a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4zM8 4v18",
  list: "M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01",
  chart: "M4 20V10M12 20V4M20 20v-7",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 4.5z",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  logOut: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  crown: "M2 20h20M4 17l-2-9 6 4 4-8 4 8 6-4-2 9H4z",
  trash: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16z",
  trendingUp: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  userPlus: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6",
};

export type IconName =
  | keyof typeof STROKE_PATHS
  | "share"
  | "link"
  | "mail"
  | "bell"
  | "bookmark"
  | "bookmarkFilled"
  | "play"
  | "search";

export interface IconProps {
  name: IconName | string;
  size?: number;
}

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Icon({ name, size = 16 }: IconProps): ReactElement {
  const base = { width: size, height: size, viewBox: "0 0 24 24" };

  if (name === "share") {
    return (
      <svg {...base} {...strokeProps}>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.6" y1="10.5" x2="15.4" y2="6.5" />
        <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
      </svg>
    );
  }

  if (name === "link") {
    return (
      <svg {...base} {...strokeProps}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg {...base} {...strokeProps}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6 12 13 2 6" />
      </svg>
    );
  }

  if (name === "eye") {
    return (
      <svg {...base} {...strokeProps}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  if (name === "bell") {
    return (
      <svg {...base} {...strokeProps}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    );
  }

  if (name === "eyeOff") {
    return (
      <svg {...base} {...strokeProps}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    );
  }

  if (name === "bookmark") {
    return (
      <svg {...base} {...strokeProps}>
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    );
  }

  if (name === "bookmarkFilled") {
    return (
      <svg
        {...base}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    );
  }

  if (name === "play") {
    return (
      <svg {...base} fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    );
  }

  if (name === "search") {
    return (
      <svg {...base} {...strokeProps}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );
  }

  return (
    <svg {...base} {...strokeProps}>
      <path d={STROKE_PATHS[name] || ""} />
    </svg>
  );
}

export default Icon;
