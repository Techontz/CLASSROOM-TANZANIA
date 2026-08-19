"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { DOWNLOADS } from "@/data/downloads";

/**
 * Real PDF downloads. Ported 1:1 from index.html `DownloadsScreen`.
 * The PDFs now live in /public and are served from the site root.
 */
export function DownloadsScreen() {
  const router = useRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <ScreenHeader title="Downloads" onBack={() => router.push("/dashboard")} />
      <div style={{ padding: "4px 16px 16px" }}>
        <p className="footnote" style={{ textAlign: "left", margin: "0 0 14px" }}>
          Save the original PDF to your device so you can study it offline, exactly as it was
          released.
        </p>
        {DOWNLOADS.map((d) => (
          <a key={d.id} href={`/${d.file}`} download className="download-card">
            <div className="download-icon">
              <Icon name="fileText" size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="download-top">
                <p className="download-subject">{d.subject}</p>
                <span className="download-type">{d.type}</span>
              </div>
              <p className="download-meta">
                {d.title} · {d.board}
              </p>
            </div>
            <Icon name="download" size={16} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default DownloadsScreen;
