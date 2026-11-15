"use client";
import { useState } from "react";
import { saveCampaign } from "./actions";
import { fieldStyle, listRowStyle } from "./styles";
import { emptyCampaign, type Campaign } from "./types";
import { useSave } from "./useSave";
import { LIMITS, validateCampaign } from "./validation";

export default function CampaignEditor({
  items,
  onMessage,
}: {
  items: Campaign[];
  onMessage: (message: string) => void;
}) {
  const [draft, setDraft] = useState<Campaign>(emptyCampaign);
  const { busy, run } = useSave(validateCampaign, saveCampaign, onMessage);

  async function handleSave() {
    if (await run(draft)) setDraft(emptyCampaign);
  }

  return (
    <div className="grid">
      <section className="card">
        <h3>{draft.id ? "Edit" : "Create"} campaign</h3>
        <label>
          Title
          <input
            style={fieldStyle}
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
        </label>
        <label>
          Start date
          <input
            type="date"
            style={fieldStyle}
            value={draft.startDate}
            onChange={(e) => setDraft({ ...draft, startDate: e.target.value })}
          />
        </label>
        <label>
          End date
          <input
            type="date"
            style={fieldStyle}
            min={draft.startDate || undefined}
            value={draft.endDate}
            onChange={(e) => setDraft({ ...draft, endDate: e.target.value })}
          />
        </label>
        <label>
          Audience
          <select
            style={fieldStyle}
            value={draft.audience}
            onChange={(e) =>
              setDraft({ ...draft, audience: e.target.value as Campaign["audience"] })
            }
          >
            <option value="all">All members</option>
            <option value="organizations">Selected organizations (future)</option>
          </select>
        </label>
        <label>
          Notification copy
          <textarea
            rows={3}
            style={fieldStyle}
            maxLength={LIMITS.notificationText}
            value={draft.notificationText}
            onChange={(e) => setDraft({ ...draft, notificationText: e.target.value })}
          />
        </label>
        <label>
          Campaign status
          <select
            style={fieldStyle}
            value={draft.status}
            onChange={(e) => setDraft({ ...draft, status: e.target.value as Campaign["status"] })}
          >
            <option>draft</option>
            <option>scheduled</option>
          </select>
        </label>
        <p style={{ display: "flex", gap: 10 }}>
          <button className="btn" disabled={busy} onClick={handleSave}>
            {busy ? "Saving…" : "Save campaign"}
          </button>
          {draft.id && (
            <button disabled={busy} onClick={() => setDraft(emptyCampaign)}>
              Cancel edit
            </button>
          )}
        </p>
        <p className="muted small">
          Scheduling is a planning field only. This prototype cannot deliver push or email
          notifications.
        </p>
      </section>

      <section className="card">
        <h3>Campaigns ({items.length})</h3>
        {items.length === 0 && <p className="muted small">No campaigns yet.</p>}
        {items.map((item) => (
          <div key={item.id} style={listRowStyle}>
            <strong>{item.title}</strong>
            <p className="muted small">
              {item.status} • {item.startDate} – {item.endDate}
            </p>
            {item.notificationText && <p className="muted small">{item.notificationText}</p>}
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
