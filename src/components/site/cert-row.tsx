import { ArrowIcon, CheckIcon } from "@/components/ui/icons";
import type { CertificationView } from "@/features/portfolio/types";

export function CertRow({ cert, viewLabel }: { cert: CertificationView; viewLabel: string }) {
  return (
    <li className="flex items-start gap-4 border-b border-line py-5 last:border-b-0">
      <span aria-hidden className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-sm bg-safe text-white">
        <CheckIcon width={18} height={18} strokeWidth={3} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold leading-snug">{cert.name}</h3>
        <p className="mt-0.5 text-steel">{cert.issuer}</p>
        {cert.credentialUrl ? (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-hazard decoration-2 underline-offset-4"
          >
            {viewLabel}
            <ArrowIcon width={16} height={16} />
          </a>
        ) : null}
      </div>
      {cert.year ? <p className="shrink-0 pt-1 text-sm font-medium text-steel">{cert.year}</p> : null}
    </li>
  );
}
