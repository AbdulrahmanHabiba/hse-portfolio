import { getTranslations } from "next-intl/server";
import type { ProfileView } from "@/features/portfolio/types";
import { Container } from "@/components/ui/container";

export async function SiteFooter({ profile }: { profile: ProfileView | null }) {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-4 border-hazard bg-ink text-surface">
      <Container className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{profile?.name}</p>
          <p className="text-sm text-surface/70">{profile?.title}</p>
        </div>
        <p className="text-sm text-surface/70">
          © {year} {profile?.name}. {t("rights")}
        </p>
      </Container>
    </footer>
  );
}
