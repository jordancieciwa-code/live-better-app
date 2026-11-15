import DemoActions from "@/features/challenges/DemoActions";
import { yourVeryBest } from "@/features/challenges/data";
import { pillars } from "@/features/wellness/catalog";

// Server Component: only the interactive checklist (DemoActions) ships JavaScript.
export default function Home() {
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
        <a className="btn" href="#challenge">
          Explore the challenge
        </a>
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

      <h2>Today&apos;s actions</h2>
      <DemoActions />

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
