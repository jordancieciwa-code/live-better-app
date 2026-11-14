import { serverClient } from "@/lib/auth/server";
import type { Campaign, ContentItem } from "./types";

// Server-only. Reads run as the signed-in user, so RLS limits them to platform admins.
export async function loadStudio(): Promise<{ content: ContentItem[]; campaigns: Campaign[] }> {
  const db = await serverClient();
  const [contentResult, campaignResult] = await Promise.all([
    db
      .from("studio_content")
      .select("id,title,kind,pillar,description,url,status")
      .order("updated_at", { ascending: false }),
    db
      .from("studio_campaigns")
      .select("id,title,start_date,end_date,audience,status,notification_text,content_ids")
      .order("updated_at", { ascending: false }),
  ]);

  if (contentResult.error || campaignResult.error) {
    console.error("loadStudio failed", contentResult.error ?? campaignResult.error);
    throw new Error("Studio database is unavailable. Check migrations and permissions.");
  }

  const content = (contentResult.data ?? []) as ContentItem[];
  const campaigns: Campaign[] = (campaignResult.data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    startDate: row.start_date,
    endDate: row.end_date,
    audience: row.audience,
    status: row.status,
    notificationText: row.notification_text,
    contentIds: row.content_ids ?? [],
  }));

  return { content, campaigns };
}
