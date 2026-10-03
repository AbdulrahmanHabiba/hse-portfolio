import { getTranslations } from "next-intl/server";
import { saveExperience } from "@/features/experience/actions";
import { PageTitle } from "@/components/dashboard/page-title";
import { ExperienceForm } from "../_components/experience-form";

export default async function NewExperiencePage() {
  const t = await getTranslations("dashboard.experience");
  return (
    <>
      <PageTitle title={t("new")} />
      <ExperienceForm action={saveExperience.bind(null, null)} defaults={{ sortOrder: 0 }} />
    </>
  );
}
