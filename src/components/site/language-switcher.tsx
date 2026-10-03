"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const OTHER: Record<Locale, { locale: Locale; label: string }> = {
  ar: { locale: "en", label: "English" },
  en: { locale: "ar", label: "العربية" },
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const target = OTHER[locale];

  return (
    <Link href={pathname} locale={target.locale} lang={target.locale} hrefLang={target.locale} className={className}>
      {target.label}
    </Link>
  );
}
