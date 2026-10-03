/** Small scaffold-tag glyph used as the site mark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden className={className}>
      <path d="M7 3.5h10a2 2 0 0 1 2 2V20a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20V5.5a2 2 0 0 1 2-2Z" fill="var(--color-ink)" />
      <rect x="5" y="3.5" width="14" height="5" rx="1.5" fill="var(--color-hazard)" />
      <circle cx="12" cy="6" r="1.4" fill="var(--color-ink)" />
      <path d="m8.5 14.5 2.3 2.3 4.7-4.7" fill="none" stroke="var(--color-surface)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
