import type { Campaign, ContentItem } from "./types";
export function validateContent(item: ContentItem): string | null {
  if (!item.title.trim() || item.title.length > 160) return "Title must be 1–160 characters.";
  if (!item.description.trim() || item.description.length > 2000)
    return "Description must be 1–2000 characters.";
  if (
    !["video", "recipe", "article", "activity"].includes(item.kind) ||
    !["move", "nourish", "thrive"].includes(item.pillar) ||
    !["draft", "published"].includes(item.status)
  )
    return "Invalid content category or status.";
  if (item.kind === "video") {
    try {
      const url = new URL(item.url);
      const allowed = ["youtube.com", "www.youtube.com", "youtu.be", "www.youtube-nocookie.com"];
      if (url.protocol !== "https:" || !allowed.includes(url.hostname))
        return "Use a valid HTTPS YouTube URL.";
    } catch {
      return "A valid YouTube URL is required.";
    }
  }
  return null;
}
export function validateCampaign(item: Campaign): string | null {
  if (!item.title.trim() || item.title.length > 160)
    return "Campaign title must be 1–160 characters.";
  if (
    !["all", "organizations"].includes(item.audience) ||
    !["draft", "scheduled"].includes(item.status)
  )
    return "Invalid campaign audience or status.";
  if (!item.startDate || !item.endDate) return "Both campaign dates are required.";
  if (item.endDate < item.startDate) return "End date must be after start date.";
  return null;
}
export function youtubeEmbed(raw: string): string | null {
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:") return null;
    let id: string | null = null;
    if (u.hostname === "youtu.be") id = u.pathname.slice(1);
    else if (["youtube.com", "www.youtube.com", "www.youtube-nocookie.com"].includes(u.hostname))
      id = u.pathname.startsWith("/shorts/")
        ? u.pathname.split("/")[2]
        : u.pathname.startsWith("/embed/")
          ? u.pathname.split("/")[2]
          : u.searchParams.get("v");
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id)
      ? "https://www.youtube-nocookie.com/embed/" + id
      : null;
  } catch {
    return null;
  }
}
