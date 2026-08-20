import { LucideIcon, SearchX } from "lucide-react";

export default function EmptyState({
  icon: Icon = SearchX,
  title = "No items found.",
  description = "Try changing your search or filters.",
  action,
}: {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl comic-border border-dashed bg-paper/60 px-6 py-14 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sunshine-light comic-border">
        <Icon className="h-8 w-8 text-ink" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-xl font-bold text-ink">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-ink-soft">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
