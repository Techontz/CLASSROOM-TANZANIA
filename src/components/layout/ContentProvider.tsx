"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { hydrateContent } from "@/content/store";
import { useSession } from "./SessionProvider";
import LoadingScreen from "./LoadingScreen";

// ---------------------------------------------------------------------------
// Content hydration gate.
//
// The screens read subjects, topics, tests and papers synchronously from module
// scope, so the catalogue has to be in place before the first one renders. This
// provider fetches it once, then renders its children.
//
// It refetches when the session changes, because a signed-out catalogue is
// served without the answer keys the quiz screen needs to mark an answer the
// instant it is tapped.
// ---------------------------------------------------------------------------

interface ContentContextValue {
  /** True once content is available, from the API, the cache or the fallback. */
  contentReady: boolean;
  /** "fallback" means the API could not be reached and shipped content is in use. */
  source: "api" | "cache" | "fallback" | null;
}

const ContentContext = createContext<ContentContextValue>({
  contentReady: false,
  source: null,
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const { authChecked, isAuthenticated } = useSession();
  const [ready, setReady] = useState(false);
  const [source, setSource] = useState<ContentContextValue["source"]>(null);

  useEffect(() => {
    // Wait for the session check, so the first fetch already carries the token
    // and comes back with the answer keys rather than needing a second round.
    if (!authChecked) return;

    let active = true;
    setReady(false);

    hydrateContent(isAuthenticated)
      .then((result) => {
        if (!active) return;
        setSource(result.source);
      })
      .finally(() => {
        if (active) setReady(true);
      });

    return () => {
      active = false;
    };
  }, [authChecked, isAuthenticated]);

  if (!ready) return <LoadingScreen />;

  return (
    <ContentContext.Provider value={{ contentReady: ready, source }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentStatus(): ContentContextValue {
  return useContext(ContentContext);
}

export default ContentProvider;
