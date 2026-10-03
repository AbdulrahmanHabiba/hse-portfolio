import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getProfile } from "@/features/portfolio/queries";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const profile = await getProfile(locale as Locale);

  return (
    <>
      <SiteHeader profile={profile} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter profile={profile} />
    </>
  );
}
