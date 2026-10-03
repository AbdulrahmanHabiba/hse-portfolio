import { getTranslations } from "next-intl/server";
import { saveSkillGroup } from "@/features/skills/actions";
import { PageTitle } from "@/components/dashboard/page-title";
import { SkillForm } from "../_components/skill-form";

export default async function NewSkillGroupPage() {
  const t = await getTranslations("dashboard.skills");
  return (
    <>
      <PageTitle title={t("new")} />
      <SkillForm action={saveSkillGroup.bind(null, null)} defaults={{ sortOrder: 0 }} />
    </>
  );
}
