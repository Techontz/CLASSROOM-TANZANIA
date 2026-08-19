"use client";

import { useState } from "react";
import Icon from "./Icon";

export interface ShareActionsProps {
  url: string;
  message?: string;
}

/** Copy link / WhatsApp / Email row. Ported 1:1 from index.html. */
export function ShareActions({ url, message }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        })
        .catch(() => {});
    }
  }

  function shareWhatsApp() {
    const text = (message ? message + " " : "") + url;
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
  }

  function shareEmail() {
    window.open(
      "mailto:?subject=" +
        encodeURIComponent(message || "Classroom Tanzania") +
        "&body=" +
        encodeURIComponent(url),
      "_blank",
    );
  }

  return (
    <div className="share-panel">
      <button className="share-panel-item" onClick={copyLink}>
        <Icon name="link" size={14} />
        <span>{copied ? "Copied!" : "Copy link"}</span>
      </button>
      <button className="share-panel-item" onClick={shareWhatsApp}>
        <Icon name="share" size={14} />
        <span>WhatsApp</span>
      </button>
      <button className="share-panel-item" onClick={shareEmail}>
        <Icon name="mail" size={14} />
        <span>Email</span>
      </button>
    </div>
  );
}

export default ShareActions;
