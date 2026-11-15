"use client";
import { useState } from "react";
import { saveContent } from "./actions";
import { fieldStyle, listRowStyle } from "./styles";
import { emptyContent, type ContentItem, type ContentKind, type Pillar } from "./types";
import { useSave } from "./useSave";
import { validateContent, youtubeEmbed } from "./validation";

const KINDS: ContentKind[] = ["video", "recipe", "article", "activity"];
const PILLARS: Pillar[] = ["move", "nourish", "thrive"];

export default function ContentEditor({
  items,
  onMessage,
}: {
  items: ContentItem[];
  onMessage: (message: string) => void;
}) {
  const [draft, setDraft] = useState<ContentItem>(emptyContent);
  const { busy, run } = useSave(validateContent, saveContent, onMessage);
  const embedUrl = draft.kind === "video" ? youtubeEmbed(draft.url) : null;

  async function handleSave() {
    if (await run(draft)) setDraft(emptyContent);
  }

  return (
    <div className="grid">
      <section className="card">
        <h3>{draft.id ? "Edit" : "Add"} content</h3>
        <label>
          Title
          <input
            style={fieldStyle}
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
        </label>
        <label>
          Type
          <select
            style={fieldStyle}
            value={draft.kind}
            onChange={(e) => setDraft({ ...draft, kind: e.target.value as ContentKind })}
          >
            {KINDS.map((kind) => (
              <option key={kind}>{kind}</option>
            ))}
          </select>
        </label>
        <label>
          Pillar
          <select
            style={fieldStyle}
            value={draft.pillar}
            onChange={(e) => setDraft({ ...draft, pillar: e.target.value as Pillar })}
          >
            {PILLARS.map((pillar) => (
              <option key={pillar}>{pillar}</option>
            ))}
          </select>
        </label>
        <label>
          Description
          <textarea
            style={fieldStyle}
            rows={3}
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          />
        </label>
        <label>
          {draft.kind === "video" ? "YouTube URL" : "Reference link (optional, https://)"}
          <input
            style={fieldStyle}
            type="url"
            value={draft.url}
            onChange={(e) => setDraft({ ...draft, url: e.target.value })}
          />
        </label>
        <label>
          Status
          <select
            style={fieldStyle}
            value={draft.status}
            onChange={(e) =>
              setDraft({ ...draft, status: e.target.value as ContentItem["status"] })
            }
          >
            <option>draft</option>
            <option>published</option>
          </select>
        </label>
        <p style={{ display: "flex", gap: 10 }}>
          <button className="btn" disabled={busy} onClick={handleSave}>
            {busy ? "Saving…" : "Save content"}
          </button>
          {draft.id && (
            <button disabled={busy} onClick={() => setDraft(emptyContent)}>
              Cancel edit
            </button>
          )}
        </p>
        {embedUrl && (
          <iframe
            title="Video preview"
            src={embedUrl}
            style={{ width: "100%", aspectRatio: "16/9", border: 0 }}
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </section>

      <section className="card">
        <h3>Content items ({items.length})</h3>
        {items.length === 0 && <p className="muted small">No content yet.</p>}
        {items.map((item) => (
          <div key={item.id} style={listRowStyle}>
            <strong>{item.title}</strong>
            <p className="muted small">
              {item.kind} • {item.pillar} • {item.status}
            </p>
            <button
              onClick={() => {
                setDraft(item);
                onMessage("");
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
