import type { ReactNode } from "react";

/**
 * Outer responsive shell. Full-bleed on phones, letterboxed on desktop.
 * Markup and class names are unchanged from index.html's `App` component.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-bg">
      <div className="app-shell">{children}</div>
    </div>
  );
}

export default AppShell;
