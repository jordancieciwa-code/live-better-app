import { signIn, signOut } from "./actions";

const inputStyle = { display: "block", width: "100%", padding: 12, margin: "8px 0 18px" } as const;

const errorMessages: Record<string, string> = {
  missing: "Enter your email and password.",
  invalid: "Sign in failed. Check your details.",
};

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  if (error === "forbidden") {
    return (
      <main className="shell">
        <div className="brand">
          LIVE<span>BETTER</span>
        </div>
        <section className="card" style={{ maxWidth: 440, marginTop: 50 }}>
          <h1 style={{ fontSize: 32 }}>No studio access</h1>
          <p className="muted">
            You are signed in, but this account does not have a platform admin role. Ask a platform
            admin to grant access, or sign in with a different account.
          </p>
          <form action={signOut}>
            <button className="btn" type="submit">
              Sign out
            </button>
          </form>
        </section>
      </main>
    );
  }

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
        {error && <p role="alert">{errorMessages[error] ?? errorMessages.invalid}</p>}
        <form action={signIn}>
          <label>
            Email
            <input required name="email" type="email" autoComplete="email" style={inputStyle} />
          </label>
          <label>
            Password
            <input
              required
              name="password"
              type="password"
              autoComplete="current-password"
              style={inputStyle}
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
