import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function serverClient() {
  const jar = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase environment variables are missing");
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return jar.getAll();
      },
      setAll(items) {
        try {
          items.forEach(({ name, value, options }) => jar.set(name, value, options));
        } catch {
          // Server Components cannot write cookies. src/middleware.ts refreshes
          // the session, so this is safe to ignore here.
        }
      },
    },
  });
}

export type StudioAccess = "allowed" | "signed-out" | "forbidden";

// Checks the session with Supabase (getUser, not getSession) and looks up the
// platform role in the database. Never trust a role sent from the browser.
export async function getStudioAccess(): Promise<StudioAccess> {
  const supabase = await serverClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return "signed-out";

  const { data, error: roleError } = await supabase
    .from("platform_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "platform_admin")
    .maybeSingle();
  if (roleError || !data) return "forbidden";
  return "allowed";
}

export async function requireStudioAccess(): Promise<boolean> {
  return (await getStudioAccess()) === "allowed";
}
