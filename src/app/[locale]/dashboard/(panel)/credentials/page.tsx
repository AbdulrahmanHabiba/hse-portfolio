import { getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { Link } from "@/i18n/navigation";
import { deleteCertification } from "@/features/certifications/actions";
import { deleteEducation } from "@/features/education/actions";
import { ActionButton } from "@/components/dashboard/form-kit";
import { EmptyList, ListRow, PageTitle } from "@/components/dashboard/page-title";
import { buttonStyles } from "@/components/ui/button";

export default async function CredentialsAdminPage() {
  const [t, certs, education] = await Promise.all([
    getTranslations("dashboard"),
    db.certification.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
    db.education.findMany({ orderBy: [{ sortOrder: "asc" }, { graduationYear: "desc" }] }),
  ]);

  return (
    <>
      <PageTitle title={t("credentials.title")} description={t("credentials.description")} />

      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">{t("credentials.certifications")}</h2>
          <Link href="/dashboard/credentials/certifications/new" className={buttonStyles({ size: "sm" })}>{t("common.add")}</Link>
        </div>
        {certs.length === 0 ? (
          <EmptyList text={t("common.empty")} />
        ) : (
          <ul className="rounded-xl border-2 border-ink bg-surface">
            {certs.map((c) => (
              <ListRow
                key={c.id}
                actions={
                  <>
                    <Link href={`/dashboard/credentials/certifications/${c.id}`} className={buttonStyles({ variant: "secondary", size: "sm" })}>{t("common.edit")}</Link>
                    <ActionButton action={deleteCertification.bind(null, c.id)} label={t("common.delete")} confirmText={t("common.confirmDelete")} />
                  </>
                }
              >
                <p className="font-semibold">{c.nameEn}</p>
                <p className="text-sm text-steel">{c.issuerEn}{c.year ? ` - ${c.year}` : ""}</p>
                <p className="text-sm text-steel" dir="rtl">{c.nameAr}</p>
              </ListRow>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">{t("credentials.education")}</h2>
          <Link href="/dashboard/credentials/education/new" className={buttonStyles({ size: "sm" })}>{t("common.add")}</Link>
        </div>
        {education.length === 0 ? (
          <EmptyList text={t("common.empty")} />
        ) : (
          <ul className="rounded-xl border-2 border-ink bg-surface">
            {education.map((e) => (
              <ListRow
                key={e.id}
                actions={
                  <>
                    <Link href={`/dashboard/credentials/education/${e.id}`} className={buttonStyles({ variant: "secondary", size: "sm" })}>{t("common.edit")}</Link>
                    <ActionButton action={deleteEducation.bind(null, e.id)} label={t("common.delete")} confirmText={t("common.confirmDelete")} />
                  </>
                }
              >
                <p className="font-semibold">{e.degreeEn}</p>
                <p className="text-sm text-steel">{e.institutionEn} - {e.graduationYear}</p>
                <p className="text-sm text-steel" dir="rtl">{e.degreeAr}</p>
              </ListRow>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
