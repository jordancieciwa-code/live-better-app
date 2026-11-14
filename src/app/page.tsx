"use client";
import { useState } from "react";
import { yourVeryBest } from "@/features/challenges/data";
import { pillars } from "@/features/wellness/catalog";
const tasks = [
  { id: "move", label: "Complete a workout", xp: 50 },
  { id: "recipe", label: "Try a recipe", xp: 35 },
  { id: "learn", label: "Watch an expert lesson", xp: 25 },
  { id: "recover", label: "Practice relaxation", xp: 20 },
];
export default function Home() {
  const [done, setDone] = useState<string[]>([]);
  const score = tasks.filter((t) => done.includes(t.id)).reduce((n, t) => n + t.xp, 0);
  return (
    <main className="shell">
      <header className="top">
        <div className="brand">
          LIVE<span>BETTER</span>
        </div>
        <span className="pill">FOUNDATION DEMO</span>
      </header>
      <section className="hero">
        <span className="pill">FEATURED • 6 WEEK CHALLENGE</span>
        <h1>YOUR VERY BEST</h1>
        <p className="muted">Six weeks. Small actions. Real progress.</p>
        <button
          className="btn"
          onClick={() =>
            document.getElementById("challenge")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore the challenge
        </button>
      </section>
      <h2>Live better, your way</h2>
      <div className="grid">
        {pillars.map((p) => (
          <article className="card" key={p.id}>
            <div className="accent" style={{ fontSize: 30 }}>
              {p.icon}
            </div>
            <h3>{p.title}</h3>
            <p className="muted">{p.description}</p>
          </article>
        ))}
      </div>
      <h2>Today's actions</h2>
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
                onChange={(e) =>
                  setDone((d) => (e.target.checked ? [...d, t.id] : d.filter((x) => x !== t.id)))
                }
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
      <h2 id="challenge">Your Very Best • Weekly missions</h2>
      <div className="grid">
        {yourVeryBest.map((w) => (
          <article className="card" key={w.week}>
            <span className="pill">WEEK {w.week}</span>
            <h3>{w.title}</h3>
            <p className="muted">{w.mission}</p>
          </article>
        ))}
      </div>
      <p className="muted small" style={{ marginTop: 30 }}>
        Live Better prototype • Corporate accounts, badges, social integrations, notifications, and
        trainer verification are planned, not yet active.
      </p>
    </main>
  );
}
