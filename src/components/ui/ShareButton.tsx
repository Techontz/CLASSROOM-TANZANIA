"use client";

import { useState } from "react";
import Icon from "./Icon";
import ShareActions from "./ShareActions";
import { buildShareUrl } from "@/lib/deep-links";

export interface ShareButtonProps {
  /** Deep-link hash path, e.g. "topic/bio/b1". Format is unchanged from the original. */
  hashPath: string;
  message?: string;
  size?: number;
}

/** Header share icon with a popover. Ported 1:1 from index.html. */
export function ShareButton({ hashPath, message, size }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const url = buildShareUrl(hashPath);

  return (
    <span style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
      <button className="nav-arrow-btn" onClick={() => setOpen((o) => !o)} aria-label="Share">
        <Icon name="share" size={size || 16} />
      </button>
      {open && (
        <div className="share-popover">
          <ShareActions url={url} message={message} />
        </div>
      )}
    </span>
  );
}

export default ShareButton;
