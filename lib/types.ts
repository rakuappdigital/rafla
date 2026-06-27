export type Priority = "simdi" | "sonra" | "hayal";

export interface RaflaItem {
  id: string;
  url: string;
  title: string;
  image?: string;
  price?: string;
  siteName?: string;
  note?: string;
  priority: Priority;
  tags: string[];
  listId: string;
  archived: boolean;
  createdAt: string;
}

export interface RaflaList {
  id: string;
  name: string;
  emoji?: string;
  createdAt: string;
}
