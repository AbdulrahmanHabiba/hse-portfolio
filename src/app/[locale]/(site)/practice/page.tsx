import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getSkillGroups } from "@/features/portfolio/queries";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";

const groupSymbols = [
  <svg key="safety" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z"/><path d="m9 12 2 2 4-4"/></svg>,
  <svg key="talk" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v12H8l-4 4V5Z"/><path d="M8 9h8M8 13h5"/></svg>,
  <svg key="computer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 22h8m-4-4v4"/></svg>,
  <svg key="technical" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5l8-3 8 3v14l-8 3-8-3Z"/><path d="m8 11 3 3 5-5"/></svg>,
];

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
          {groups.map((group, index) => (
            <section key={group.id} className="rounded-xl border-2 border-ink bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-ink p-2.5 text-white">{groupSymbols[index % groupSymbols.length]}</span>
                <h2 className="text-xl font-semibold">{group.title}</h2>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="flex min-h-14 items-start gap-3 rounded-lg border border-line bg-paper p-3">
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
