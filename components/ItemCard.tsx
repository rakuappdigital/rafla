"use client";

import { RaflaItem } from "@/lib/types";
import PriorityBadge from "./PriorityBadge";
import { archiveItem, deleteItem } from "@/lib/storage";

interface Props {
  item: RaflaItem;
  onUpdate: () => void;
  onEdit: (item: RaflaItem) => void;
}

export default function ItemCard({ item, onUpdate, onEdit }: Props) {
  function handleArchive() {
    archiveItem(item.id);
    onUpdate();
  }

  function handleDelete() {
    deleteItem(item.id);
    onUpdate();
  }

  return (
    <div className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm border border-stone-100 group">
      {/* Görsel */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">🛍️</div>
        )}
      </div>

      {/* İçerik */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-stone-800 leading-snug line-clamp-2 hover:underline"
          >
            {item.title || item.url}
          </a>
          {/* Aksiyonlar */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button
              onClick={() => onEdit(item)}
              className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600"
              title="Düzenle"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button
              onClick={handleArchive}
              className="p-1 rounded-lg hover:bg-green-50 text-stone-400 hover:text-green-600"
              title="Satın Alındı"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-1 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500"
              title="Sil"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-1 flex items-center gap-1.5 flex-wrap">
          {item.siteName && (
            <span className="text-[11px] text-stone-400">{item.siteName}</span>
          )}
          {item.price && (
            <span className="text-[11px] font-semibold text-stone-700">{item.price}</span>
          )}
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
          <PriorityBadge priority={item.priority} />
          {item.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
              {tag}
            </span>
          ))}
        </div>

        {item.note && (
          <p className="mt-1 text-[11px] text-stone-400 italic line-clamp-1">{item.note}</p>
        )}
      </div>
    </div>
  );
}
