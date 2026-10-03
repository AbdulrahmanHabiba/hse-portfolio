import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { formatMonthYear } from "@/lib/format";
import { getEducation, getExperience } from "@/features/portfolio/queries";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { TimelineEntry } from "@/components/site/timeline-entry";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "journey" });
  return { title: t("title"), description: t("intro") };
}

export default async function JourneyPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const [experience, education, t] = await Promise.all([
    getExperience(locale),
    getEducation(locale),
    getTranslations("journey"),
  ]);

  // Work and education share one reverse-chronological timeline.
  const entries = [
    ...experience.map((e) => ({ kind: "work" as const, time: new Date(e.startDate).getTime(), data: e })),
    ...education.map((e) => ({
      kind: "education" as const,
      time: Date.UTC(e.graduationYear, 5, 1),
      data: e,
    })),
  ].sort((a, b) => b.time - a.time);

  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} />
      <section className="py-14 sm:py-20">
        <Container>
          <ol className="max-w-4xl">
            {entries.map((entry) =>
              entry.kind === "work" ? (
                <TimelineEntry
                  key={entry.data.id}
                  kind="work"
                  dates={`${formatMonthYear(entry.data.startDate, locale)} - ${
                    entry.data.endDate ? formatMonthYear(entry.data.endDate, locale) : t("present")
                  }`}
                  title={entry.data.role}
                  subtitle={entry.data.company}
                  location={entry.data.location}
                  bullets={entry.data.highlights}
                  current={!entry.data.endDate}
                  currentLabel={t("current")}
                />
              ) : (
                <TimelineEntry
                  key={entry.data.id}
                  kind="education"
                  dates={`${t("graduated")} ${entry.data.graduationYear}`}
                  title={entry.data.degree}
                  subtitle={entry.data.institution}
                  bullets={entry.data.note ? [entry.data.note] : undefined}
                />
              ),
            )}
          </ol>
        </Container>
      </section>
    </>
  );
}
