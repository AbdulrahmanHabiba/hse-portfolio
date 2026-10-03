"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string; badge?: number };

export function DashboardNav({ items }: { items: Item[] }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/dashboard" ? pathname === href : pathname.startsWith(href));

  return (
    <nav aria-label="Dashboard" className="flex gap-1 overflow-x-auto lg:flex-col">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(item.href) ? "page" : undefined}
          className={cn(
            "flex items-center justify-between gap-3 whitespace-nowrap rounded-md px-3 py-2.5 font-medium text-surface/75 transition-colors hover:bg-white/10 hover:text-surface",
            isActive(item.href) && "bg-white/12 text-surface shadow-[inset_3px_0_0_var(--color-hazard)] rtl:shadow-[inset_-3px_0_0_var(--color-hazard)]",
          )}
        >
          {item.label}
          {item.badge ? (
            <span className="rounded-full bg-hazard px-2 text-xs font-bold text-ink">{item.badge}</span>
          ) : null}
        </Link>
      ))}
    </nav>
  );
}
