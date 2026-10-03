export default function Loading() {
  return (
    <div className="space-y-4" aria-busy>
      <div className="h-9 w-56 animate-pulse rounded-md bg-ink/10" />
      <div className="h-40 animate-pulse rounded-xl bg-ink/10" />
    </div>
  );
}
