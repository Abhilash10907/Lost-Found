export default function Loading() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl comic-border bg-sunshine-light shadow-comic-sm">
        <span className="h-6 w-6 animate-spin rounded-full border-[3px] border-ink border-t-transparent" />
      </div>
      <p className="mt-4 font-display text-sm font-bold text-ink-soft">
        Digging through the lost & found...
      </p>
    </div>
  );
}
