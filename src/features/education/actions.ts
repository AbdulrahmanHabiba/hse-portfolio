"use server";

import { getLocale } from "next-intl/server";
import { updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { parseForm, type ActionState } from "@/lib/action";
import { redirect } from "@/i18n/navigation";
import { PORTFOLIO_TAG } from "@/features/portfolio/queries";
import { educationSchema } from "./schema";

export async function saveEducation(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseForm(educationSchema, formData);
  if (!parsed.success) return parsed.state;

  if (id) await db.education.update({ where: { id }, data: parsed.data });
  else await db.education.create({ data: parsed.data });

  updateTag(PORTFOLIO_TAG);
  redirect({ href: "/dashboard/credentials", locale: await getLocale() });
  return { ok: true };
}

export async function deleteEducation(id: string) {
  await requireAdmin();
  await db.education.delete({ where: { id } });
  updateTag(PORTFOLIO_TAG);
}
