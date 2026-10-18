import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ProfileView } from "@/features/portfolio/types";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowIcon, PinIcon } from "@/components/ui/icons";
import { ScaffoldLattice } from "./scaffold-lattice";
import { ScaffTag } from "./scaff-tag";

type Props = { profile: ProfileView; certifications: string[]; since?: string };

export async function HomeHero({ profile, certifications, since }: Props) {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-hidden border-b border-line">
      <ScaffoldLattice className="pointer-events-none absolute inset-y-0 end-0 w-full text-ink/[0.08] md:w-3/5 [mask-image:linear-gradient(to_left,black_25%,transparent)] rtl:[mask-image:linear-gradient(to_right,black_25%,transparent)]" />

      <Container className="relative grid items-start gap-14 pb-16 pt-12 lg:grid-cols-[1.2fr_1fr] lg:pb-24 lg:pt-20">
        <div>
          <p className="font-display text-lg font-semibold">{profile.name}</p>
          <p className="text-steel">{profile.title}</p>

          <h1 className="mt-8 max-w-[18ch] text-4xl font-semibold sm:text-5xl lg:text-[3.6rem]">{profile.tagline}</h1>
          <p className="mt-6 max-w-xl text-lg text-steel">{profile.summary}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/credentials" className={buttonStyles()}>
              {t("seeCredentials")} <ArrowIcon width={18} height={18} />
            </Link>
            <Link href="/contact" className={buttonStyles({ variant: "secondary" })}>
              {t("getInTouch")}
            </Link>
            {profile.cvUrl ? (
              <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles({ variant: "secondary" })} aria-label={t("downloadCv")}>
                <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/></svg>
                {t("downloadCv")}
              </a>
            ) : null}
          </div>

          <p className="mt-9 flex items-start gap-2 text-sm text-steel">
            <PinIcon width={18} height={18} className="mt-0.5 shrink-0" />
            <span>
              {profile.location}
              {profile.relocation ? ` - ${profile.relocation}` : ""}
            </span>
          </p>
        </div>

        <ScaffTag
          name={profile.name}
          title={profile.title}
          location={profile.location}
          certifications={certifications}
          since={since}
          labels={{
            status: t("tag.status"),
            inspector: t("tag.inspector"),
            role: t("tag.role"),
            site: t("tag.site"),
            certified: t("tag.certified"),
            frequency: t("tag.frequency"),
            frequencyValue: t("tag.frequencyValue"),
            since: t("tag.since"),
          }}
        />
      </Container>
    </section>
  );
}
