"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { parseForm, type ActionState } from "@/lib/action";
import { contactSchema } from "./schema";

/** Public action (no auth): stores a contact-form message for the dashboard inbox. */
export async function sendMessage(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = parseForm(contactSchema, formData);
  if (!parsed.success) return parsed.state;

  const { name, email, body } = parsed.data;
  await db.message.create({ data: { name, email, body } });
  revalidatePath("/[locale]/dashboard", "layout");
  return { ok: true, message: "sent", values: {} };
}

export async function toggleMessageRead(id: string, read: boolean) {
  await requireAdmin();
  await db.message.update({ where: { id }, data: { read } });
  revalidatePath("/[locale]/dashboard", "layout");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await db.message.delete({ where: { id } });
  revalidatePath("/[locale]/dashboard", "layout");
}
