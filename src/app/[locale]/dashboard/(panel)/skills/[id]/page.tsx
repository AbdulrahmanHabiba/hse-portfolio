import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { saveSkillGroup } from "@/features/skills/actions";
import { PageTitle } from "@/components/dashboard/page-title";
import { SkillForm } from "../_components/skill-form";

export default async function EditSkillGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [t, row] = await Promise.all([getTranslations("dashboard.skills"), db.skillGroup.findUnique({ where: { id } })]);
  if (!row) notFound();

  return (
    <>
      <PageTitle title={t("edit")} />
      <SkillForm
        action={saveSkillGroup.bind(null, id)}
        defaults={{ ...row, itemsEn: row.itemsEn.join("\n"), itemsAr: row.itemsAr.join("\n") }}
      />
    </>
  );
}
