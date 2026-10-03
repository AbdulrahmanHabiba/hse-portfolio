import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { toMonthInput } from "@/lib/format";
import { saveExperience } from "@/features/experience/actions";
import { PageTitle } from "@/components/dashboard/page-title";
import { ExperienceForm } from "../_components/experience-form";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [t, row] = await Promise.all([getTranslations("dashboard.experience"), db.experience.findUnique({ where: { id } })]);
  if (!row) notFound();

  return (
    <>
      <PageTitle title={t("edit")} />
      <ExperienceForm
        action={saveExperience.bind(null, id)}
        defaults={{
          ...row,
          startDate: toMonthInput(row.startDate),
          endDate: toMonthInput(row.endDate),
          highlightsEn: row.highlightsEn.join("\n"),
          highlightsAr: row.highlightsAr.join("\n"),
        }}
      />
    </>
  );
}
