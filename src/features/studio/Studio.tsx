"use client";
import { useState } from "react";
import CampaignEditor from "./CampaignEditor";
import ContentEditor from "./ContentEditor";
import type { Campaign, ContentItem } from "./types";

type Tab = "content" | "campaigns";

// Records are loaded on the server (src/features/studio/repository.ts) and
// passed in. After a save, router.refresh() re-renders with fresh data.
export default function Studio({
  initialContent,
  initialCampaigns,
}: {
  initialContent: ContentItem[];
  initialCampaigns: Campaign[];
}) {
  const [tab, setTab] = useState<Tab>("content");
  const [message, setMessage] = useState("");

  function switchTab(next: Tab) {
    setTab(next);
    setMessage("");
  }

  return (
    <div>
      <div className="top">
        <h2>Content & Campaign Studio</h2>
        <span className="pill">ADMIN WORKSPACE</span>
      </div>
      <p className="muted">
        Content and campaign records are saved to the database. File uploads and notification
        delivery are not enabled.
      </p>
      <div style={{ display: "flex", gap: 10, margin: "22px 0" }}>
        <button
          className="btn"
          aria-pressed={tab === "content"}
          onClick={() => switchTab("content")}
        >
          Content library
        </button>
        <button
          className="btn"
          aria-pressed={tab === "campaigns"}
          onClick={() => switchTab("campaigns")}
        >
          Campaign planner
        </button>
      </div>
      {message && (
        <p role="status" className="pill">
          {message}
        </p>
      )}
      {tab === "content" ? (
        <ContentEditor items={initialContent} onMessage={setMessage} />
      ) : (
        <CampaignEditor items={initialCampaigns} onMessage={setMessage} />
      )}
    </div>
  );
}
