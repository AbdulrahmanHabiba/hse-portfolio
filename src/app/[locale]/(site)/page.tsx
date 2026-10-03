import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatMonthYear } from "@/lib/format";
import { getCertifications, getExperience, getProfile } from "@/features/portfolio/queries";
import { HomeHero } from "@/components/site/home-hero";
import { SetupNotice } from "@/components/site/setup-notice";
import { CertRow } from "@/components/site/cert-row";
import { Container } from "@/components/ui/container";
import { ArrowIcon } from "@/components/ui/icons";
import { buttonStyles } from "@/components/ui/button";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const profile = await getProfile(locale as Locale);
  return { title: { absolute: profile ? `${profile.name} - ${profile.title}` : "HSE Portfolio" } };
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const [profile, experience, certifications, t] = await Promise.all([
    getProfile(locale),
    getExperience(locale),
    getCertifications(locale),
    getTranslations("home"),
  ]);

  if (!profile) return <SetupNotice />;

  const current = experience[0];

  return (
    <>
      <HomeHero
        profile={profile}
        certifications={certifications.slice(0, 4).map((c) => c.name)}
        since={current ? formatMonthYear(current.startDate, locale) : undefined}
      />

      {current ? (
        <section className="py-16 sm:py-20">
          <Container>
            <h2 className="text-3xl font-semibold">{t("currentRole")}</h2>
            <article className="mt-8 rounded-xl border-2 border-ink bg-surface p-6 sm:p-9">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-2xl font-semibold">{current.role}</h3>
                <p className="text-sm font-medium text-steel">
                  {formatMonthYear(current.startDate, locale)} - {current.endDate ? formatMonthYear(current.endDate, locale) : t("present")}
                </p>
              </div>
              <p className="mt-1 text-steel">
                {current.company} - {current.location}
              </p>
              <ul className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
                {current.highlights.slice(0, 6).map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 bg-ink" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <Link href="/journey" className="mt-8 inline-flex items-center gap-2 font-semibold underline decoration-hazard decoration-2 underline-offset-4">
                {t("fullJourney")} <ArrowIcon width={18} height={18} />
              </Link>
            </article>
          </Container>
        </section>
      ) : null}

      {certifications.length > 0 ? (
        <section className="border-y border-line bg-surface py-16 sm:py-20">
          <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <h2 className="text-3xl font-semibold">{t("credentialsTitle")}</h2>
              <p className="mt-4 max-w-sm text-steel">{t("credentialsIntro")}</p>
              <Link href="/credentials" className={`${buttonStyles({ variant: "secondary" })} mt-7`}>
                {t("allCredentials")}
              </Link>
            </div>
            <ul>
              {certifications.slice(0, 5).map((c) => (
                <CertRow key={c.id} cert={c} viewLabel={t("viewCredential")} />
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 border-s-4 border-hazard ps-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t("ctaTitle")}</h2>
            {profile.relocation ? <p className="mt-2 text-steel">{profile.relocation}</p> : null}
          </div>
          <Link href="/contact" className={buttonStyles()}>
            {t("ctaButton")} <ArrowIcon width={18} height={18} />
          </Link>
        </Container>
      </section>
    </>
  );
}
