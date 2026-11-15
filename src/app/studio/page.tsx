import { redirect } from "next/navigation";
import Studio from "@/features/studio/Studio";
import { getStudioAccess } from "@/lib/auth/server";
import { signOut } from "@/app/login/actions";
import { loadStudio } from "@/features/studio/repository";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return (
      <main className="shell">
        <h1>Studio setup required</h1>
        <p>Configure Supabase before using this protected workspace.</p>
      </main>
    );

  const access = await getStudioAccess();
  if (access === "signed-out") redirect("/login");
  // Signed in but not an admin: send them to a page that explains why and
  // lets them sign out, instead of looping back to a blank login form.
  if (access === "forbidden") redirect("/login?error=forbidden");

  const records = await loadStudio();
  return (
    <main className="shell">
      <header className="top">
        <div className="brand">
          LIVE<span>BETTER</span>
        </div>
        <form action={signOut}>
          <button className="btn">Sign out</button>
        </form>
      </header>
      <Studio initialContent={records.content} initialCampaigns={records.campaigns} />
    </main>
  );
}
