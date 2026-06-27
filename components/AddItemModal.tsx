"use client";

import { useState } from "react";
import { RaflaItem, RaflaList, Priority } from "@/lib/types";
import { addItem, updateItem } from "@/lib/storage";

interface Props {
  lists: RaflaList[];
  activeListId: string;
  editItem?: RaflaItem;
  onClose: () => void;
  onSave: () => void;
}

const PRIORITIES: { value: Priority; label: string }[] = [
  { value: "simdi", label: "Şimdi Al" },
  { value: "sonra", label: "Sonra Bak" },
  { value: "hayal", label: "Hayal" },
];

export default function AddItemModal({ lists, activeListId, editItem, onClose, onSave }: Props) {
  const [url, setUrl] = useState(editItem?.url || "");
  const [title, setTitle] = useState(editItem?.title || "");
  const [image, setImage] = useState(editItem?.image || "");
  const [price, setPrice] = useState(editItem?.price || "");
  const [siteName, setSiteName] = useState(editItem?.siteName || "");
  const [note, setNote] = useState(editItem?.note || "");
  const [priority, setPriority] = useState<Priority>(editItem?.priority || "sonra");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(editItem?.tags || []);
  const [listId, setListId] = useState(editItem?.listId || activeListId);
  const [fetching, setFetching] = useState(false);

  async function fetchMetadata() {
    if (!url) return;
    setFetching(true);
    try {
      const res = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.title) setTitle(data.title);
      if (data.image) setImage(data.image);
      if (data.price) setPrice(data.price);
      if (data.siteName) setSiteName(data.siteName);
      if (data.description && !note) setNote(data.description);
    } finally {
      setFetching(false);
    }
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  function handleSave() {
    if (!url) return;
    const item: RaflaItem = {
      id: editItem?.id || crypto.randomUUID(),
      url,
      title: title || url,
      image: image || undefined,
      price: price || undefined,
      siteName: siteName || undefined,
      note: note || undefined,
      priority,
      tags,
      listId,
      archived: editItem?.archived || false,
      createdAt: editItem?.createdAt || new Date().toISOString(),
    };
    if (editItem) updateItem(item);
    else addItem(item);
    onSave();
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-xl">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-stone-800">
              {editItem ? "Düzenle" : "Ürün Ekle"}
            </h2>
            <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            {/* URL */}
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onBlur={fetchMetadata}
                className="flex-1 text-sm border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-400 bg-stone-50"
              />
              <button
                onClick={fetchMetadata}
                disabled={fetching}
                className="px-3 py-2.5 rounded-xl bg-stone-800 text-white text-sm font-medium disabled:opacity-50"
              >
                {fetching ? "..." : "Çek"}
              </button>
            </div>

            {/* Önizleme */}
            {(image || title) && (
              <div className="flex gap-3 p-3 bg-stone-50 rounded-xl">
                {image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-stone-700 line-clamp-2">{title}</p>
                  {price && <p className="text-sm text-stone-500 mt-0.5">{price}</p>}
                </div>
              </div>
            )}

            {/* Başlık (düzenlenebilir) */}
            <input
              type="text"
              placeholder="Ürün adı"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-400 bg-stone-50"
            />

            {/* Fiyat */}
            <input
              type="text"
              placeholder="Fiyat (opsiyonel)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-400 bg-stone-50"
            />

            {/* Öncelik */}
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPriority(p.value)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                    priority === p.value
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Etiketler */}
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Etiket ekle..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  className="flex-1 text-sm border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-400 bg-stone-50"
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2.5 rounded-xl bg-stone-100 text-stone-600 text-sm"
                >
                  +
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)} className="text-stone-400 hover:text-stone-600">×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Not */}
            <textarea
              placeholder="Not ekle... (L beden, indirimde al, vb.)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-400 bg-stone-50 resize-none"
            />

            {/* Liste seç */}
            <select
              value={listId}
              onChange={(e) => setListId(e.target.value)}
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-400 bg-stone-50"
            >
              {lists.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.emoji} {l.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSave}
            disabled={!url}
            className="mt-4 w-full py-3 rounded-2xl bg-stone-800 text-white font-medium text-sm disabled:opacity-40"
          >
            {editItem ? "Kaydet" : "Rafa Ekle"}
          </button>
        </div>
      </div>
    </div>
  );
}
