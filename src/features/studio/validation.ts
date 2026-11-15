import type { Campaign, ContentItem } from "./types";

// These limits must match supabase/migrations (0002_studio.sql, 0003_review_fixes.sql).
export const LIMITS = {
  title: 160,
  description: 2000,
  url: 2000,
  notificationText: 500,
} as const;

const CONTENT_KINDS = ["video", "recipe", "article", "activity"];
const PILLARS = ["move", "nourish", "thrive"];
const CONTENT_STATUSES = ["draft", "published"];
const AUDIENCES = ["all", "organizations"];
const CAMPAIGN_STATUSES = ["draft", "scheduled"];
const YOUTUBE_HOSTS = ["youtube.com", "www.youtube.com", "youtu.be", "www.youtube-nocookie.com"];

const isString = (value: unknown): value is string => typeof value === "string";

function isHttpsUrl(raw: string): boolean {
  try {
    return new URL(raw).protocol === "https:";
  } catch {
    return false;
  }
}

// YYYY-MM-DD and a real calendar date (rejects 2026-02-30).
function isIsoDate(raw: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return false;
  const date = new Date(raw + "T00:00:00Z");
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(raw);
}

// Server actions can be called directly with any payload, so check the shape
// before touching any field.
export function validateContent(input: unknown): string | null {
  if (typeof input !== "object" || input === null) return "Invalid content.";
  const item = input as Record<string, unknown>;
  const fields = ["id", "title", "kind", "pillar", "description", "url", "status"];
  if (!fields.every((field) => isString(item[field]))) return "Invalid content.";
  const { title, kind, pillar, description, url, status } = input as ContentItem;

  if (!title.trim() || title.length > LIMITS.title)
    return `Title must be 1–${LIMITS.title} characters.`;
  if (!description.trim() || description.length > LIMITS.description)
    return `Description must be 1–${LIMITS.description} characters.`;
  if (!CONTENT_KINDS.includes(kind) || !PILLARS.includes(pillar))
    return "Invalid content type or pillar.";
  if (!CONTENT_STATUSES.includes(status)) return "Invalid content status.";
  if (url.length > LIMITS.url) return `Links must be under ${LIMITS.url} characters.`;

  if (kind === "video") {
    if (!youtubeEmbed(url)) return "Use a valid HTTPS YouTube video URL.";
  } else if (url.trim() && !isHttpsUrl(url.trim())) {
    return "Reference links must start with https://.";
  }
  return null;
}

export function validateCampaign(input: unknown): string | null {
  if (typeof input !== "object" || input === null) return "Invalid campaign.";
  const item = input as Record<string, unknown>;
  const fields = ["id", "title", "startDate", "endDate", "audience", "status", "notificationText"];
  if (!fields.every((field) => isString(item[field]))) return "Invalid campaign.";
  if (!Array.isArray(item.contentIds) || !item.contentIds.every(isString))
    return "Invalid campaign.";
  const { title, startDate, endDate, audience, status, notificationText } = input as Campaign;

  if (!title.trim() || title.length > LIMITS.title)
    return `Campaign title must be 1–${LIMITS.title} characters.`;
  if (!AUDIENCES.includes(audience) || !CAMPAIGN_STATUSES.includes(status))
    return "Invalid campaign audience or status.";
  if (!startDate || !endDate) return "Both campaign dates are required.";
  if (!isIsoDate(startDate) || !isIsoDate(endDate)) return "Dates must be valid (YYYY-MM-DD).";
  // ISO dates compare correctly as strings.
  if (endDate < startDate) return "End date must be on or after the start date.";
  if (notificationText.length > LIMITS.notificationText)
    return `Notification copy must be ${LIMITS.notificationText} characters or fewer.`;
  return null;
}

// Returns a privacy-friendly embed URL, or null if this is not a YouTube video link.
export function youtubeEmbed(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || !YOUTUBE_HOSTS.includes(url.hostname)) return null;

  let id: string | null;
  if (url.hostname === "youtu.be") {
    id = url.pathname.slice(1);
  } else if (url.pathname.startsWith("/shorts/") || url.pathname.startsWith("/embed/")) {
    id = url.pathname.split("/")[2];
  } else {
    id = url.searchParams.get("v");
  }

  return id && /^[a-zA-Z0-9_-]{11}$/.test(id)
    ? "https://www.youtube-nocookie.com/embed/" + id
    : null;
}
