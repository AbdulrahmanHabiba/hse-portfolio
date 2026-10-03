import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { saveEducation } from "@/features/education/actions";
import { PageTitle } from "@/components/dashboard/page-title";
import { EducationForm } from "../../_components/education-form";

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [t, row] = await Promise.all([getTranslations("dashboard.credentials"), db.education.findUnique({ where: { id } })]);
  if (!row) notFound();

  return (
    <>
      <PageTitle title={t("editEducation")} />
      <EducationForm action={saveEducation.bind(null, id)} defaults={row} />
    </>
  );
}
