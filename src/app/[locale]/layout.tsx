import "@fontsource-variable/readex-pro";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "../globals.css";

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isRtl, routing, type Locale } from "@/i18n/routing";
import { getProfile } from "@/features/portfolio/queries";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#16222e",
};

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const profile = await getProfile(locale);
  const isAr = locale === "ar";
  const shortTitle = isAr ? "عبد الرحمن حبيبة | مسؤول سلامة" : "Abdulrahman Habiba | HSE Officer";
  const brandName = isAr ? "عبد الرحمن حبيبة" : "Abdulrahman Habiba";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: shortTitle,
      template: `%s | ${brandName}`,
    },
    description: profile?.summary,
    icons: {
      icon: "/icon.png",
      shortcut: "/icon.png",
      apple: "/icon.png",
    },
    openGraph: {
      type: "profile",
      locale: isAr ? "ar_EG" : "en_GB",
      title: shortTitle,
      description: profile?.summary,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Opt this request into static rendering (required with next-intl + generateStaticParams).
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html lang={locale} dir={isRtl(locale as Locale) ? "rtl" : "ltr"} data-scroll-behavior="smooth">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="absolute start-3 top-3 z-50 -translate-y-20 rounded-md bg-hazard px-4 py-2 font-semibold text-ink focus:translate-y-0"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
