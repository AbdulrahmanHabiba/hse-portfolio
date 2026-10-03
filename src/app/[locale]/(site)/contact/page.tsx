import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getProfile } from "@/features/portfolio/queries";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { LinkedinIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { ContactForm } from "@/components/site/contact-form";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "contact" });
  return { title: t("title"), description: t("intro") };
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const [profile, t] = await Promise.all([getProfile(locale), getTranslations("contact")]);

  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          {profile ? (
            <dl className="space-y-6">
              <Detail icon={<MailIcon />} label={t("details.email")}>
                <a href={`mailto:${profile.email}`} className="ltr-island underline decoration-hazard decoration-2 underline-offset-4">
                  {profile.email}
                </a>
              </Detail>
              <Detail icon={<PhoneIcon />} label={t("details.phone")}>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="ltr-island">
                  {profile.phone}
                </a>
              </Detail>
              {profile.linkedin ? (
                <Detail icon={<LinkedinIcon />} label={t("details.linkedin")}>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="underline decoration-hazard decoration-2 underline-offset-4">
                    {t("details.linkedinCta")}
                  </a>
                </Detail>
              ) : null}
              <Detail icon={<PinIcon />} label={t("details.location")}>
                {profile.location}
                {profile.relocation ? <span className="block text-steel">{profile.relocation}</span> : null}
              </Detail>
            </dl>
          ) : null}

          <div className="rounded-xl border-2 border-ink bg-surface p-6 sm:p-9">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

function Detail({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-ink/30 bg-surface">{icon}</span>
      <div>
        <dt className="text-sm text-steel">{label}</dt>
        <dd className="text-lg font-medium">{children}</dd>
      </div>
    </div>
  );
}
