export type ContentKind = "video" | "recipe" | "article" | "activity";
export type ContentStatus = "draft" | "published";
export type Pillar = "move" | "nourish" | "thrive";

export type ContentItem = {
  id: string; // empty string for a record that has not been saved yet
  title: string;
  kind: ContentKind;
  pillar: Pillar;
  description: string;
  url: string;
  status: ContentStatus;
};

export type Campaign = {
  id: string; // empty string for a record that has not been saved yet
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  audience: "all" | "organizations";
  status: "draft" | "scheduled";
  notificationText: string;
  contentIds: string[];
};

export type SaveResult = { ok: boolean; message: string };

export const emptyContent: ContentItem = {
  id: "",
  title: "",
  kind: "video",
  pillar: "move",
  description: "",
  url: "",
  status: "draft",
};

export const emptyCampaign: Campaign = {
  id: "",
  title: "",
  startDate: "",
  endDate: "",
  audience: "all",
  status: "draft",
  notificationText: "",
  contentIds: [],
};
