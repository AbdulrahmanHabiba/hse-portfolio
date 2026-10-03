"use server";

import { getLocale } from "next-intl/server";
import { updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { parseForm, type ActionState } from "@/lib/action";
import { redirect } from "@/i18n/navigation";
import { PORTFOLIO_TAG } from "@/features/portfolio/queries";
import { certificationSchema } from "./schema";

export async function saveCertification(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseForm(certificationSchema, formData);
  if (!parsed.success) return parsed.state;

  const data = { ...parsed.data, year: parsed.data.year === "" ? null : parsed.data.year };

  if (id) await db.certification.update({ where: { id }, data });
  else await db.certification.create({ data });

  updateTag(PORTFOLIO_TAG);
  redirect({ href: "/dashboard/credentials", locale: await getLocale() });
  return { ok: true };
}

export async function deleteCertification(id: string) {
  await requireAdmin();
  await db.certification.delete({ where: { id } });
  updateTag(PORTFOLIO_TAG);
}
