"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";

export type BottomNavTab = "home" | "trending" | "bookmarks" | "progress";

interface NavItem {
  id: BottomNavTab;
  label: string;
  icon: string;
  href: string;
}

/**
 * Bottom tab bar. Same four tabs, same order, same labels and icons as
 * index.html — navigation now goes through the router instead of a state string.
 */
const ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: "home", href: "/dashboard" },
  { id: "trending", label: "Trending", icon: "trendingUp", href: "/trending" },
  { id: "bookmarks", label: "Bookmarks", icon: "bookmark", href: "/bookmarks" },
  { id: "progress", label: "Performance", icon: "chart", href: "/performance" },
];

export function BottomNav({ active }: { active: BottomNavTab }) {
  const router = useRouter();
  return (
    <div className="bottom-nav">
      {ITEMS.map((it) => {
        const isActive = it.id === active;
        const cls = "nav-item" + (isActive ? " active" : "");
        return (
          <button
            key={it.id}
            className={cls}
            onClick={() => {
              if (!isActive) router.push(it.href);
            }}
          >
            <Icon name={it.icon} size={18} />
            <span>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default BottomNav;
