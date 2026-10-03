import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type Props = {
  dates: string;
  title: string;
  subtitle: string;
  location?: string;
  bullets?: string[];
  kind: "work" | "education";
  current?: boolean;
  currentLabel?: string;
};

export function TimelineEntry({ dates, title, subtitle, location, bullets, kind, current, currentLabel }: Props) {
  return (
    <li className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-8">
      <p className="pt-1 text-sm font-medium text-steel">{dates}</p>

      <div className="relative border-s-2 border-ink/25 ps-7 pb-12 last:pb-0">
        <span
          aria-hidden
          className={cn(
            "absolute -start-[9px] top-1.5 size-4 border-2 border-ink",
            kind === "work" ? "bg-hazard" : "rounded-full bg-paper",
          )}
        />
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-xl font-semibold">{title}</h3>
          {current && currentLabel ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-safe-soft px-2.5 py-0.5 text-xs font-semibold text-safe">
              <CheckIcon width={12} height={12} strokeWidth={3} />
              {currentLabel}
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-steel">
          {subtitle}
          {location ? <span> — {location}</span> : null}
        </p>

        {bullets && bullets.length > 0 ? (
          <ul className="mt-4 max-w-2xl space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 bg-ink" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}
