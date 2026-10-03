import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ProfileView } from "@/features/portfolio/types";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "./language-switcher";
import { LogoMark } from "./logo-mark";
import { SiteNav } from "./site-nav";

export async function SiteHeader({ profile }: { profile: ProfileView | null }) {
  const t = await getTranslations("nav");

  const items = [
    { href: "/", label: t("home") },
    { href: "/journey", label: t("journey") },
    { href: "/credentials", label: t("credentials") },
    { href: "/practice", label: t("practice") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="relative z-20 border-b border-line bg-surface/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-[1.05rem] font-semibold">
          <LogoMark />
          <span>{profile?.name ?? "HSE"}</span>
        </Link>
        <SiteNav items={items} menuLabel={t("openMenu")} closeLabel={t("closeMenu")}>
          <LanguageSwitcher />
        </SiteNav>
      </Container>
    </header>
  );
}
