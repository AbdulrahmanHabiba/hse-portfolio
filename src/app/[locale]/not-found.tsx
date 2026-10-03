import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <main id="main" className="flex flex-1 items-center">
      <Container className="py-24">
        <p className="font-display text-7xl font-semibold text-ink/20">404</p>
        <h1 className="mt-4 text-3xl font-semibold">{t("title")}</h1>
        <p className="mt-3 max-w-md text-steel">{t("body")}</p>
        <Link href="/" className={`${buttonStyles()} mt-8`}>{t("back")}</Link>
      </Container>
    </main>
  );
}
