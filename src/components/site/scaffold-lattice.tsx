/**
 * Decorative scaffold framework (standards, ledgers and braces) drawn as an SVG pattern.
 * Purely visual: hidden from assistive tech, faded with a mask so text stays readable.
 */
export function ScaffoldLattice({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className} width="100%" height="100%" focusable="false">
      <defs>
        <pattern id="lattice" width="132" height="132" patternUnits="userSpaceOnUse">
          <path d="M0 0V132M0 0H132M0 0L132 132" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="0" cy="0" r="7" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lattice)" />
    </svg>
  );
}
