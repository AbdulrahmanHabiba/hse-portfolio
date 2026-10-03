import type { Locale } from "@/i18n/routing";

const INTL_LOCALE: Record<Locale, string> = {
  en: "en-GB",
  // `-u-nu-latn` keeps Latin digits (matches the CV and phone numbers).
  ar: "ar-EG-u-nu-latn",
};

/** "2026-08" or ISO date -> "Aug 2026" / "أغسطس 2026" */
export function formatMonthYear(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function formatDateTime(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

/** Date -> "YYYY-MM" for <input type="month"> */
export function toMonthInput(date: Date | null | undefined) {
  return date ? date.toISOString().slice(0, 7) : "";
}

/** "YYYY-MM" -> Date (UTC, first day of month) */
export function fromMonthInput(value: string) {
  return new Date(`${value}-01T00:00:00.000Z`);
}
