"use client";

import { RaflaList } from "@/lib/types";
import { saveLists } from "@/lib/storage";
import { useState } from "react";

interface Props {
  lists: RaflaList[];
  activeListId: string;
  onSelectList: (id: string) => void;
  onListsChange: () => void;
  showArchive: boolean;
  onToggleArchive: () => void;
}

export default function Sidebar({ lists, activeListId, onSelectList, onListsChange, showArchive, onToggleArchive }: Props) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("📦");

  function handleAddList() {
    if (!newName.trim()) return;
    const newList: RaflaList = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      emoji: newEmoji,
      createdAt: new Date().toISOString(),
    };
    saveLists([...lists, newList]);
    onListsChange();
    setNewName("");
    setAdding(false);
  }

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col gap-1 py-4">
      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-3 mb-1">Listeler</p>

      {lists.map((list) => (
        <button
          key={list.id}
          onClick={() => { onSelectList(list.id); }}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors text-left ${
            activeListId === list.id && !showArchive
              ? "bg-stone-800 text-white"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <span>{list.emoji}</span>
          <span className="truncate">{list.name}</span>
        </button>
      ))}

      {adding ? (
        <div className="px-3 py-2 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="emoji"
              value={newEmoji}
              onChange={(e) => setNewEmoji(e.target.value)}
              className="w-10 text-center text-sm border border-stone-200 rounded-lg px-1 py-1 outline-none"
            />
            <input
              type="text"
              placeholder="Liste adı"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddList()}
              autoFocus
              className="flex-1 text-sm border border-stone-200 rounded-lg px-2 py-1 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddList} className="flex-1 text-xs py-1.5 rounded-lg bg-stone-800 text-white">Ekle</button>
            <button onClick={() => setAdding(false)} className="flex-1 text-xs py-1.5 rounded-lg bg-stone-100 text-stone-600">İptal</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-stone-400 hover:text-stone-600 hover:bg-stone-100"
        >
          <span>+</span>
          <span>Yeni Liste</span>
        </button>
      )}

      <div className="mt-auto pt-4">
        <button
          onClick={onToggleArchive}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium w-full transition-colors ${
            showArchive ? "bg-stone-800 text-white" : "text-stone-400 hover:bg-stone-100 hover:text-stone-600"
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/>
            <line x1="10" y1="12" x2="14" y2="12"/>
          </svg>
          Arşiv
        </button>
      </div>
    </aside>
  );
}
