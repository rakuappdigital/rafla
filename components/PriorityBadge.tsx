import { Priority } from "@/lib/types";

const config: Record<Priority, { label: string; className: string }> = {
  simdi: { label: "Şimdi Al", className: "bg-emerald-100 text-emerald-700" },
  sonra: { label: "Sonra Bak", className: "bg-amber-100 text-amber-700" },
  hayal: { label: "Hayal", className: "bg-purple-100 text-purple-700" },
};

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, className } = config[priority];
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  );
}
