"use client";

import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";

export interface ScreenHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  onBack?: () => void;
  backLabel?: string;
  /** Right-hand slot: share button, bookmark button, nav arrows. */
  actions?: ReactNode;
}

/**
 * The `.q-header` bar used by nearly every non-home screen.
 * Markup matches index.html exactly; only the repetition is factored out.
 */
export function ScreenHeader({
  title,
  subtitle,
  onBack,
  backLabel = "Back",
  actions,
}: ScreenHeaderProps) {
  return (
    <div className="q-header">
      {onBack && (
        <button className="back-btn" onClick={onBack} aria-label={backLabel}>
          <Icon name="chevronLeft" size={18} />
        </button>
      )}
      {subtitle !== undefined ? (
        <div>
          <p className="q-title">{title}</p>
          <p className="q-sub">{subtitle}</p>
        </div>
      ) : (
        <p className="q-title">{title}</p>
      )}
      {actions}
    </div>
  );
}

export default ScreenHeader;
