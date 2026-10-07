export default function Loading() {
  return (
    <div role="status" className="flex items-center justify-center py-20">
      <span className="sr-only">Loading…</span>
      <div aria-hidden="true" className="flex gap-2">
        <div className="h-3 w-3 animate-bounce rounded-sm bg-primary [animation-delay:-0.3s]" />
        <div className="h-3 w-3 animate-bounce rounded-sm bg-primary [animation-delay:-0.15s]" />
        <div className="h-3 w-3 animate-bounce rounded-sm bg-primary" />
      </div>
    </div>
  );
}
