import { getTranslations } from "next-intl/server";
import { saveEducation } from "@/features/education/actions";
import { PageTitle } from "@/components/dashboard/page-title";
import { EducationForm } from "../../_components/education-form";

export default async function NewEducationPage() {
  const t = await getTranslations("dashboard.credentials");
  return (
    <>
      <PageTitle title={t("newEducation")} />
      <EducationForm action={saveEducation.bind(null, null)} defaults={{ sortOrder: 0 }} />
    </>
  );
}
