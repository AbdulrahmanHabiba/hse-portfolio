import { getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { Link } from "@/i18n/navigation";
import { PageTitle } from "@/components/dashboard/page-title";
import { buttonStyles } from "@/components/ui/button";

export default async function OverviewPage() {
  const t = await getTranslations("dashboard.overview");

  const [profile, experience, certifications, education, skills, unread] = await Promise.all([
    db.profile.findUnique({ where: { id: 1 }, select: { id: true } }),
    db.experience.count(),
    db.certification.count(),
    db.education.count(),
    db.skillGroup.count(),
    db.message.count({ where: { read: false } }),
  ]);

  const cards = [
    { href: "/dashboard/experience", label: t("experience"), value: experience },
    { href: "/dashboard/credentials", label: t("certifications"), value: certifications },
    { href: "/dashboard/credentials", label: t("education"), value: education },
    { href: "/dashboard/skills", label: t("skills"), value: skills },
    { href: "/dashboard/messages", label: t("unread"), value: unread },
  ];

  return (
    <>
      <PageTitle title={t("title")} description={t("description")} />

      {!profile ? (
        <div className="mb-8 rounded-xl border-2 border-hazard bg-hazard-soft p-5">
          <p className="font-semibold">{t("noProfile")}</p>
          <Link href="/dashboard/profile" className={`${buttonStyles({ size: "sm" })} mt-3`}>
            {t("setupProfile")}
          </Link>
        </div>
      ) : null}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.label}>
            <Link href={card.href} className="block rounded-xl border-2 border-ink bg-surface p-5 transition-colors hover:bg-white">
              <p className="font-display text-4xl font-semibold">{card.value}</p>
              <p className="mt-1 text-steel">{card.label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
