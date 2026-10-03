import { getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { logout } from "@/features/auth/actions";
import { Link } from "@/i18n/navigation";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { LogoMark } from "@/components/site/logo-mark";

/**
 * Everything inside (panel) requires a valid session.
 * `requireAdmin()` here is the real check; proxy.ts only provides a fast redirect.
 */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const [t, unread] = await Promise.all([
    getTranslations("dashboard.nav"),
    db.message.count({ where: { read: false } }),
  ]);

  const items = [
    { href: "/dashboard", label: t("overview") },
    { href: "/dashboard/profile", label: t("profile") },
    { href: "/dashboard/experience", label: t("experience") },
    { href: "/dashboard/credentials", label: t("credentials") },
    { href: "/dashboard/skills", label: t("skills") },
    { href: "/dashboard/messages", label: t("messages"), badge: unread },
  ];

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="flex flex-col gap-6 bg-ink p-4 text-surface lg:sticky lg:top-0 lg:h-dvh lg:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2.5 font-display text-lg font-semibold">
            <LogoMark /> {t("brand")}
          </p>
          <LanguageSwitcher className="rounded-md border border-white/25 px-2.5 py-1 text-sm hover:bg-white/10" />
        </div>

        <DashboardNav items={items} />

        <div className="space-y-3 text-sm lg:mt-auto">
          <Link href="/" className="block rounded-md px-3 py-2 font-medium text-surface/75 hover:bg-white/10 hover:text-surface">
            {t("viewSite")}
          </Link>
          <p className="truncate px-3 text-surface/55" dir="ltr">{session.email}</p>
          <form action={logout}>
            <button type="submit" className="w-full rounded-md border border-white/25 px-3 py-2 text-start font-medium hover:bg-white/10">
              {t("signOut")}
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
