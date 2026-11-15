"use client";
import { useState } from "react";

// Demo only: XP here lives in browser state and resets on refresh. Real XP must
// be issued by the server (see docs/TEAM_GUIDE.md, "Security boundaries").
const tasks = [
  { id: "move", label: "Complete a workout", xp: 50 },
  { id: "recipe", label: "Try a recipe", xp: 35 },
  { id: "learn", label: "Watch an expert lesson", xp: 25 },
  { id: "recover", label: "Practice relaxation", xp: 20 },
];

export default function DemoActions() {
  const [done, setDone] = useState<string[]>([]);
  const score = tasks.filter((t) => done.includes(t.id)).reduce((sum, t) => sum + t.xp, 0);

  function toggle(id: string, checked: boolean) {
    setDone((current) => (checked ? [...current, id] : current.filter((x) => x !== id)));
  }

  return (
    <div className="card">
      <p className="accent">
        <strong>{score} XP</strong> earned in this demo
      </p>
      {tasks.map((t) => (
        <label
          key={t.id}
          style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", gap: 12 }}
        >
          <span>
            <input
              type="checkbox"
              checked={done.includes(t.id)}
              onChange={(e) => toggle(t.id, e.target.checked)}
            />{" "}
            {t.label}
          </span>
          <span className="accent">+{t.xp}</span>
        </label>
      ))}
      <p className="muted small">
        Demo state resets on refresh. No verified activities or user data are stored.
      </p>
    </div>
  );
}
