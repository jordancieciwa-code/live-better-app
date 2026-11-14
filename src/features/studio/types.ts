export type ContentKind = "video" | "recipe" | "article" | "activity";
export type ContentStatus = "draft" | "published";
export type ContentItem = {
  id: string;
  title: string;
  kind: ContentKind;
  pillar: "move" | "nourish" | "thrive";
  description: string;
  url: string;
  status: ContentStatus;
};
export type Campaign = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  audience: "all" | "organizations";
  status: "draft" | "scheduled";
  notificationText: string;
  contentIds: string[];
};
export const seedContent: ContentItem[] = [
  {
    id: "intro-move",
    title: "Movement for Every Day",
    kind: "video",
    pillar: "move",
    description: "An accessible introduction to daily movement.",
    url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    status: "draft",
  },
  {
    id: "fuel",
    title: "Build a Balanced Plate",
    kind: "recipe",
    pillar: "nourish",
    description: "Explore a simple, nourishing meal.",
    url: "",
    status: "draft",
  },
];
export const seedCampaigns: Campaign[] = [
  {
    id: "your-best",
    title: "Your Very Best",
    startDate: "",
    endDate: "",
    audience: "all",
    status: "draft",
    notificationText: "Your Very Best starts soon. Join the six-week challenge!",
    contentIds: [],
  },
];
