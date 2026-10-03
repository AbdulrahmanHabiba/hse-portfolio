import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifySession, type SessionPayload } from "./session-core";

/**
 * Data Access Layer for auth.
 * proxy.ts gives a fast redirect, but it is NOT the security boundary.
 * Every dashboard page and every Server Action calls `requireAdmin()` itself.
 */
export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySession(token);
});

export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    const locale = await getLocale();
    redirect({ href: "/dashboard/login", locale });
  }
  return session as SessionPayload;
}

export async function createSession(payload: SessionPayload) {
  const token = await signSession(payload);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}
