"use server";

import { getLocale } from "next-intl/server";
import { updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { parseForm, type ActionState } from "@/lib/action";
import { splitLines } from "@/lib/utils";
import { redirect } from "@/i18n/navigation";
import { PORTFOLIO_TAG } from "@/features/portfolio/queries";
import { skillGroupSchema } from "./schema";

export async function saveSkillGroup(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseForm(skillGroupSchema, formData);
  if (!parsed.success) return parsed.state;

  const { itemsEn, itemsAr, ...rest } = parsed.data;
  const data = { ...rest, itemsEn: splitLines(itemsEn), itemsAr: splitLines(itemsAr) };

  if (id) await db.skillGroup.update({ where: { id }, data });
  else await db.skillGroup.create({ data });

  updateTag(PORTFOLIO_TAG);
  redirect({ href: "/dashboard/skills", locale: await getLocale() });
  return { ok: true };
}

export async function deleteSkillGroup(id: string) {
  await requireAdmin();
  await db.skillGroup.delete({ where: { id } });
  updateTag(PORTFOLIO_TAG);
}
