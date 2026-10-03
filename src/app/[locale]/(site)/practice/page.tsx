import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getSkillGroups } from "@/features/portfolio/queries";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "practice" });
  return { title: t("title"), description: t("intro") };
}

export default async function PracticePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const [groups, t] = await Promise.all([getSkillGroups(locale), getTranslations("practice")]);

  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          {groups.map((group) => (
            <section key={group.id} className="rounded-xl border-2 border-ink bg-surface p-6 sm:p-8">
              <h2 className="border-b border-line pb-4 text-xl font-semibold">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden className="mt-1 flex size-5 shrink-0 items-center justify-center border-2 border-ink">
                      <CheckIcon width={14} height={14} strokeWidth={3.5} className="text-safe" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </Container>
      </section>
    </>
  );
}
