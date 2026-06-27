import { RaflaItem, RaflaList } from "./types";

const ITEMS_KEY = "rafla_items";
const LISTS_KEY = "rafla_lists";

const DEFAULT_LIST: RaflaList = {
  id: "default",
  name: "Rafım",
  emoji: "🛍️",
  createdAt: new Date().toISOString(),
};

export function getLists(): RaflaList[] {
  if (typeof window === "undefined") return [DEFAULT_LIST];
  const raw = localStorage.getItem(LISTS_KEY);
  if (!raw) {
    saveLists([DEFAULT_LIST]);
    return [DEFAULT_LIST];
  }
  return JSON.parse(raw);
}

export function saveLists(lists: RaflaList[]) {
  localStorage.setItem(LISTS_KEY, JSON.stringify(lists));
}

export function getItems(): RaflaItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(ITEMS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveItems(items: RaflaItem[]) {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

export function addItem(item: RaflaItem) {
  const items = getItems();
  saveItems([item, ...items]);
}

export function updateItem(updated: RaflaItem) {
  const items = getItems();
  saveItems(items.map((i) => (i.id === updated.id ? updated : i)));
}

export function deleteItem(id: string) {
  saveItems(getItems().filter((i) => i.id !== id));
}

export function archiveItem(id: string) {
  const items = getItems();
  saveItems(items.map((i) => (i.id === id ? { ...i, archived: true } : i)));
}
