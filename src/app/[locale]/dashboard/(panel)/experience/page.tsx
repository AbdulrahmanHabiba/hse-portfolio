import { getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { Link } from "@/i18n/navigation";
import { toMonthInput } from "@/lib/format";
import { deleteExperience } from "@/features/experience/actions";
import { ActionButton } from "@/components/dashboard/form-kit";
import { EmptyList, ListRow, PageTitle } from "@/components/dashboard/page-title";
import { buttonStyles } from "@/components/ui/button";

export default async function ExperiencePage() {
  const [t, rows] = await Promise.all([
    getTranslations("dashboard"),
    db.experience.findMany({ orderBy: [{ sortOrder: "asc" }, { startDate: "desc" }] }),
  ]);

  return (
    <>
      <PageTitle
        title={t("experience.title")}
        description={t("experience.description")}
        action={<Link href="/dashboard/experience/new" className={buttonStyles()}>{t("common.add")}</Link>}
      />
      {rows.length === 0 ? (
        <EmptyList text={t("common.empty")} />
      ) : (
        <ul className="rounded-xl border-2 border-ink bg-surface">
          {rows.map((row) => (
            <ListRow
              key={row.id}
              actions={
                <>
                  <Link href={`/dashboard/experience/${row.id}`} className={buttonStyles({ variant: "secondary", size: "sm" })}>
                    {t("common.edit")}
                  </Link>
                  <ActionButton action={deleteExperience.bind(null, row.id)} label={t("common.delete")} confirmText={t("common.confirmDelete")} />
                </>
              }
            >
              <p className="font-semibold">{row.roleEn}</p>
              <p className="text-sm text-steel">
                {row.companyEn} - {toMonthInput(row.startDate)} / {row.endDate ? toMonthInput(row.endDate) : t("common.present")}
              </p>
              <p className="text-sm text-steel" dir="rtl">{row.roleAr}</p>
            </ListRow>
          ))}
        </ul>
      )}
    </>
  );
}
