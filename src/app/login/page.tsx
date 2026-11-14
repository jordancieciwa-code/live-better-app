import { signIn } from "./actions";
export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="shell">
      <div className="brand">
        LIVE<span>BETTER</span>
      </div>
      <section className="card" style={{ maxWidth: 440, marginTop: 50 }}>
        <h1 style={{ fontSize: 32 }}>Team sign in</h1>
        <p className="muted">
          Only invited accounts with an approved platform role can access the studio.
        </p>
        {error && <p role="alert">Sign in failed. Check your details.</p>}
        <form action={signIn}>
          <label>
            Email
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 18px" }}
            />
          </label>
          <label>
            Password
            <input
              required
              name="password"
              type="password"
              autoComplete="current-password"
              style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 18px" }}
            />
          </label>
          <button className="btn" type="submit">
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
