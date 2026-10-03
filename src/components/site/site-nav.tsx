"use client";

import { useState, type ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string };

type Props = {
  items: Item[];
  menuLabel: string;
  closeLabel: string;
  /** Language switcher, rendered by the server component and slotted in here. */
  children: ReactNode;
};

export function SiteNav({ items, menuLabel, closeLabel, children }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-2 text-[0.95rem] font-medium text-steel transition-colors hover:text-ink",
              isActive(item.href) && "text-ink shadow-[inset_0_-3px_0_var(--color-hazard)]",
            )}
          >
            {item.label}
          </Link>
        ))}
        <span className="mx-2 h-5 w-px bg-line" aria-hidden />
        <span className="px-2 text-sm font-medium">{children}</span>
      </nav>

      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-surface md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : menuLabel}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open ? (
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-b border-line bg-surface md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3" aria-label="Mobile">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "border-b border-line py-3.5 text-lg font-medium",
                  isActive(item.href) ? "text-ink" : "text-steel",
                )}
              >
                {item.label}
              </Link>
            ))}
            <span className="py-3.5 text-lg font-medium" onClick={() => setOpen(false)}>
              {children}
            </span>
          </nav>
        </div>
      ) : null}
    </>
  );
}
