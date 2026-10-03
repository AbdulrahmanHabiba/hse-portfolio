import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getCertifications, getEducation } from "@/features/portfolio/queries";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { CertRow } from "@/components/site/cert-row";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "credentials" });
  return { title: t("title"), description: t("intro") };
}

export default async function CredentialsPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const [certs, education, t] = await Promise.all([
    getCertifications(locale),
    getEducation(locale),
    getTranslations("credentials"),
  ]);

  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-14 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold">{t("certifications")}</h2>
            <ul className="mt-4 border-t-2 border-ink">
              {certs.map((c) => (
                <CertRow key={c.id} cert={c} viewLabel={t("view")} />
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{t("education")}</h2>
            <ul className="mt-4 space-y-4 border-t-2 border-ink pt-5">
              {education.map((e) => (
                <li key={e.id} className="rounded-xl border border-line bg-surface p-5">
                  <p className="text-sm font-medium text-steel">{e.graduationYear}</p>
                  <h3 className="mt-1 text-lg font-semibold">{e.degree}</h3>
                  <p className="text-steel">{e.institution}</p>
                  {e.note ? <p className="mt-3 border-t border-line pt-3 text-sm">{e.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
