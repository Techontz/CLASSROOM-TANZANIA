"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import Icon from "@/components/ui/Icon";
import BottomNav from "@/components/layout/BottomNav";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { useSession } from "@/components/layout/SessionProvider";
import { fetchBookmarks, removeBookmark } from "@/services/bookmarks";
import { bandForDaysLeft } from "@/lib/format";
import { hashPathToRoute } from "@/lib/deep-links";
import type { Bookmark } from "@/types";

/** "My Shelf". Ported 1:1 from index.html `BookmarksScreen`. */
export function BookmarksScreen() {
  const router = useRouter();
  const { student } = useSession();
  const userId = student.userId;

  const [items, setItems] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const data = await fetchBookmarks();
    setItems(data);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleRemove(id: string, e: MouseEvent) {
    e.stopPropagation();
    await removeBookmark(id);
    refresh();
  }

  function handleNavigate(deepLink: string) {
    const route = hashPathToRoute(deepLink);
    if (route) router.push(route);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader title="🔖 Bookmarks" />
      <div style={{ padding: "0 16px 16px", flex: 1, overflowY: "auto" }}>
        <p className="footnote" style={{ textAlign: "left", margin: "4px 0 2px" }}>
          Saved items stay here for 30 days.
        </p>
        <p className="section-hint" style={{ margin: "0 0 16px", display: "block" }}>
          {items.length} item{items.length === 1 ? "" : "s"} saved
        </p>

        {loading && (
          <p className="footnote" style={{ textAlign: "left" }}>
            Loading...
          </p>
        )}

        {!loading && items.length === 0 && (
          <p className="footnote" style={{ textAlign: "left" }}>
            Nothing saved yet. Tap the bookmark icon on any topic, test, or past paper to add it
            here.
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {items.map((b) => {
            const band = bandForDaysLeft(b.daysLeft);
            return (
              <button
                key={b.id}
                className="bookmark-card"
                onClick={() => handleNavigate(b.deep_link)}
              >
                <div className="bookmark-card-top">
                  <span className={"bookmark-days " + band.cls}>
                    {band.dot} {b.daysLeft} day{b.daysLeft === 1 ? "" : "s"} left
                  </span>
                  <span className="bookmark-remove" onClick={(e) => handleRemove(b.id, e)}>
                    <Icon name="x" size={14} />
                  </span>
                </div>
                <p className="bookmark-title">{b.title}</p>
                <p className="bookmark-subtitle">{b.subtitle}</p>
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav active="bookmarks" />
    </div>
  );
}

export default BookmarksScreen;
