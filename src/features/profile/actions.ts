"use server";

import { updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { parseForm, type ActionState } from "@/lib/action";
import { PORTFOLIO_TAG } from "@/features/portfolio/queries";
import { profileSchema } from "./schema";

export async function saveProfile(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseForm(profileSchema, formData);
  if (!parsed.success) return parsed.state;

  await db.profile.upsert({
    where: { id: 1 },
    create: { id: 1, ...parsed.data },
    update: parsed.data,
  });

  updateTag(PORTFOLIO_TAG);
  return { ok: true, message: "saved", values: parsed.values };
}
