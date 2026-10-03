import { CheckIcon } from "@/components/ui/icons";

type Props = {
  labels: {
    status: string;
    inspector: string;
    role: string;
    site: string;
    certified: string;
    frequency: string;
    frequencyValue: string;
    since: string;
  };
  name: string;
  title: string;
  location: string;
  certifications: string[];
  since?: string;
};

/**
 * The hero object: a scaffold inspection tag, the thing an HSE officer signs
 * before anyone is allowed to climb. Every value comes from the dashboard data.
 */
export function ScaffTag({ labels, name, title, location, certifications, since }: Props) {
  return (
    <div className="tag-hang animate-tag-swing mx-auto w-full max-w-[21rem]">
      {/* cord */}
      <div aria-hidden className="mx-auto h-16 w-[3px] bg-ink" />

      <div className="relative rounded-2xl border-2 border-ink bg-surface shadow-[8px_10px_0_rgba(22,34,46,0.14)]">
        {/* eyelet the cord passes through */}
        <span aria-hidden className="absolute start-1/2 top-3 size-5 -translate-x-1/2 rounded-full border-2 border-ink bg-paper rtl:translate-x-1/2" />

        <div className="flex items-center gap-2 rounded-t-[0.85rem] bg-safe px-5 pb-3 pt-11 text-white">
          <CheckIcon width={22} height={22} strokeWidth={3} />
          <p className="font-display text-xl font-semibold">{labels.status}</p>
        </div>

        <dl className="divide-y divide-line px-5 text-[0.95rem]">
          <Row label={labels.inspector} value={name} strong />
          <Row label={labels.role} value={title} />
          <Row label={labels.site} value={location} />
          {certifications.length > 0 ? (
            <div className="py-3">
              <dt className="text-xs text-steel">{labels.certified}</dt>
              <dd className="mt-1.5 space-y-1">
                {certifications.map((c) => (
                  <p key={c} className="flex items-start gap-2 leading-snug">
                    <CheckIcon width={16} height={16} strokeWidth={3} className="mt-0.5 shrink-0 text-safe" />
                    <span>{c}</span>
                  </p>
                ))}
              </dd>
            </div>
          ) : null}
          <Row label={labels.frequency} value={labels.frequencyValue} />
          {since ? <Row label={labels.since} value={since} /> : null}
        </dl>
        <div className="h-4" />
      </div>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="py-3">
      <dt className="text-xs text-steel">{label}</dt>
      <dd className={strong ? "font-display text-lg font-semibold leading-snug" : "leading-snug"}>{value}</dd>
    </div>
  );
}
