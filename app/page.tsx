"use client";

import { useEffect, useState } from "react";
import { RaflaItem, RaflaList, Priority } from "@/lib/types";
import { getItems, getLists, archiveItem, deleteItem } from "@/lib/storage";
import ItemCard from "@/components/ItemCard";
import AddItemModal from "@/components/AddItemModal";
import Sidebar from "@/components/Sidebar";
import PriorityBadge from "@/components/PriorityBadge";

const PRIORITY_ORDER: Priority[] = ["simdi", "sonra", "hayal"];

export default function Home() {
  const [items, setItems] = useState<RaflaItem[]>([]);
  const [lists, setLists] = useState<RaflaList[]>([]);
  const [activeListId, setActiveListId] = useState("default");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<RaflaItem | undefined>();
  const [showArchive, setShowArchive] = useState(false);
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [view, setView] = useState<"list" | "grid">("list");

  function refresh() {
    setItems(getItems());
    setLists(getLists());
  }

  useEffect(() => {
    refresh();
  }, []);

  const activeList = lists.find((l) => l.id === activeListId);

  const visibleItems = items
    .filter((item) => {
      if (showArchive) return item.archived;
      return !item.archived && item.listId === activeListId;
    })
    .filter((item) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    })
    .filter((item) => filterPriority === "all" || item.priority === filterPriority)
    .sort((a, b) => PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority));

  function openEdit(item: RaflaItem) {
    setEditItem(item);
    setShowModal(true);
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <div className="max-w-4xl mx-auto flex gap-6 px-4 py-6">
        {/* Sidebar */}
        <Sidebar
          lists={lists}
          activeListId={activeListId}
          onSelectList={(id) => { setActiveListId(id); setShowArchive(false); }}
          onListsChange={refresh}
          showArchive={showArchive}
          onToggleArchive={() => setShowArchive((v) => !v)}
        />

        {/* Ana içerik */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-stone-800">
              {showArchive
                ? "Arşiv"
                : activeList
                ? `${activeList.emoji} ${activeList.name}`
                : "Rafla"}
            </h1>
            <div className="flex items-center gap-2">
              {/* Grid / List toggle */}
              <div className="flex bg-stone-100 rounded-xl p-1">
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 rounded-lg transition-colors ${view === "list" ? "bg-white shadow-sm text-stone-700" : "text-stone-400"}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${view === "grid" ? "bg-white shadow-sm text-stone-700" : "text-stone-400"}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                  </svg>
                </button>
              </div>

              {!showArchive && (
                <button
                  onClick={() => { setEditItem(undefined); setShowModal(true); }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-stone-800 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Ekle
                </button>
              )}
            </div>
          </div>

          {/* Arama + Filtre */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-stone-400 bg-white"
            />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as Priority | "all")}
              className="text-sm border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-stone-400 bg-white text-stone-600"
            >
              <option value="all">Tümü</option>
              <option value="simdi">Şimdi Al</option>
              <option value="sonra">Sonra Bak</option>
              <option value="hayal">Hayal</option>
            </select>
          </div>

          {/* İçerik */}
          {visibleItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-stone-300">
              <span className="text-5xl mb-3">🛍️</span>
              <p className="text-sm">
                {showArchive ? "Arşiv boş" : "Henüz ürün yok — Ekle butonuna bas!"}
              </p>
            </div>
          ) : view === "list" ? (
            <div className="flex flex-col gap-2.5">
              {visibleItems.map((item) => (
                <ItemCard key={item.id} item={item} onUpdate={refresh} onEdit={openEdit} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 group flex flex-col"
                >
                  {/* Görsel */}
                  <div className="aspect-square bg-stone-100 relative overflow-hidden">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">🛍️</div>
                    )}
                    {/* Hover aksiyonlar */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 rounded-lg bg-white/90 text-stone-500 hover:text-stone-700 shadow-sm"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => { archiveItem(item.id); refresh(); }}
                        className="p-1.5 rounded-lg bg-white/90 text-stone-500 hover:text-stone-700 shadow-sm"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" />
                          <line x1="10" y1="12" x2="14" y2="12" />
                        </svg>
                      </button>
                      <button
                        onClick={() => { deleteItem(item.id); refresh(); }}
                        className="p-1.5 rounded-lg bg-white/90 text-red-400 hover:text-red-600 shadow-sm"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Bilgi */}
                  <div className="p-3 flex-1 flex flex-col gap-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-stone-800 line-clamp-2 leading-snug hover:underline"
                    >
                      {item.title || item.url}
                    </a>
                    <div className="flex items-center gap-1.5 flex-wrap mt-auto">
                      {item.price && (
                        <span className="text-xs font-semibold text-stone-600">{item.price}</span>
                      )}
                      <PriorityBadge priority={item.priority} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <AddItemModal
          lists={lists}
          activeListId={activeListId}
          editItem={editItem}
          onClose={() => setShowModal(false)}
          onSave={() => { refresh(); setShowModal(false); }}
        />
      )}
    </div>
  );
}
