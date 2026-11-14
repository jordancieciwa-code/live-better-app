import {redirect} from "next/navigation";
import Studio from "@/features/studio/Studio";
import {requireStudioAccess} from "@/lib/auth/server";
import {signOut} from "@/app/login/actions";
export const dynamic="force-dynamic";
export default async function StudioPage(){
  if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return <main className="shell"><h1>Studio setup required</h1><p>Configure Supabase before using this protected workspace.</p></main>;
  if(!(await requireStudioAccess()))redirect("/login");
  return <main className="shell"><header className="top"><div className="brand">LIVE<span>BETTER</span></div><form action={signOut}><button className="btn">Sign out</button></form></header><Studio/></main>;
}
