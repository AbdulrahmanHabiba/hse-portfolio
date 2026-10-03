"use server";

import bcrypt from "bcryptjs";
import { getLocale } from "next-intl/server";
import { db } from "@/lib/db";
import { createSession, destroySession } from "@/lib/dal";
import { parseForm, type ActionState } from "@/lib/action";
import { redirect } from "@/i18n/navigation";
import { loginSchema } from "./schema";

// Compared against when the email is unknown, so response time does not reveal which emails exist.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = parseForm(loginSchema, formData);
  if (!parsed.success) return { ok: false, message: "invalidCredentials" };

  const { email, password } = parsed.data;
  let user = null;
  try {
    user = await db.user.findUnique({ where: { email: email.toLowerCase() } });
  } catch (error) {
    console.error("[login] Database error:", error);
    return { ok: false, message: "invalidCredentials" };
  }

  const valid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);

  if (!user || !valid) return { ok: false, message: "invalidCredentials" };

  await createSession({ userId: user.id, email: user.email });
  redirect({ href: "/dashboard", locale: await getLocale() });
  return { ok: true };
}

export async function logout() {
  await destroySession();
  redirect({ href: "/dashboard/login", locale: await getLocale() });
}
