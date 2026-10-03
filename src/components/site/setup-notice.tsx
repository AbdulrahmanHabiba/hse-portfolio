import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";

/** Shown instead of the page when the database has no profile yet (before the first seed). */
export async function SetupNotice() {
  const t = await getTranslations("setup");
  return (
    <Container className="py-24">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-3 max-w-xl text-steel">{t("body")}</p>
      <Link href="/dashboard" className={`${buttonStyles()} mt-8`}>{t("cta")}</Link>
    </Container>
  );
}
