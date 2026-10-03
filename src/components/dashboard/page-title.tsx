import type { ReactNode } from "react";

export function PageTitle({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        {description ? <p className="mt-1.5 max-w-2xl text-steel">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

/** Row used by every dashboard list (experience, certifications, ...). */
export function ListRow({ children, actions }: { children: ReactNode; actions: ReactNode }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-b-0">
      <div className="min-w-0">{children}</div>
      <div className="flex items-center gap-2">{actions}</div>
    </li>
  );
}

export function EmptyList({ text }: { text: string }) {
  return <p className="rounded-xl border border-dashed border-ink/30 px-6 py-12 text-center text-steel">{text}</p>;
}
