"use server";

import { getLocale } from "next-intl/server";
import { updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { parseForm, type ActionState } from "@/lib/action";
import { fromMonthInput } from "@/lib/format";
import { splitLines } from "@/lib/utils";
import { redirect } from "@/i18n/navigation";
import { PORTFOLIO_TAG } from "@/features/portfolio/queries";
import { experienceSchema } from "./schema";

/** `id` is bound from the page: saveExperience.bind(null, id). `null` means "create". */
export async function saveExperience(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseForm(experienceSchema, formData);
  if (!parsed.success) return parsed.state;

  const { startDate, endDate, highlightsEn, highlightsAr, ...rest } = parsed.data;
  const data = {
    ...rest,
    startDate: fromMonthInput(startDate),
    endDate: endDate ? fromMonthInput(endDate) : null,
    highlightsEn: splitLines(highlightsEn),
    highlightsAr: splitLines(highlightsAr),
  };

  if (id) await db.experience.update({ where: { id }, data });
  else await db.experience.create({ data });

  updateTag(PORTFOLIO_TAG);
  redirect({ href: "/dashboard/experience", locale: await getLocale() });
  return { ok: true };
}

export async function deleteExperience(id: string) {
  await requireAdmin();
  await db.experience.delete({ where: { id } });
  updateTag(PORTFOLIO_TAG);
}
