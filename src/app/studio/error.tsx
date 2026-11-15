"use client";

// Shown when loading the studio fails (for example, migrations not applied).
// The real error is logged on the server; never show raw database errors here.
export default function StudioError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="shell">
      <section className="card" style={{ maxWidth: 520, marginTop: 50 }}>
        <h1 style={{ fontSize: 28 }}>The studio could not load</h1>
        <p className="muted">
          The database may be unavailable or not set up yet. Check that migrations 0001–0003 have
          been applied, then try again.
        </p>
        <button className="btn" onClick={reset}>
          Try again
        </button>
      </section>
    </main>
  );
}
