"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { login } from "@/features/auth/actions";
import { initialState } from "@/lib/action";
import { Button } from "@/components/ui/button";

const inputClass =
  "mt-1.5 w-full rounded-md border border-ink/30 bg-white px-3 py-2.5 text-base outline-none focus:border-ink";

function Submit({ label, pending: pendingLabel }: { label: string; pending: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? pendingLabel : label}
    </Button>
  );
}

export function LoginForm() {
  const t = useTranslations("dashboard.login");
  const [state, action] = useActionState(login, initialState);

  return (
    <form action={action} className="mt-8 space-y-5">
      {state.message === "invalidCredentials" ? (
        <p role="alert" className="rounded-md border border-stop/40 bg-red-50 px-4 py-3 font-medium text-stop">
          {t("invalid")}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="font-medium">{t("email")}</label>
        <input id="email" name="email" type="email" autoComplete="username" required dir="ltr" className={`${inputClass} text-start`} />
      </div>
      <div>
        <label htmlFor="password" className="font-medium">{t("password")}</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required dir="ltr" className={`${inputClass} text-start`} />
      </div>
      <Submit label={t("submit")} pending={t("submitting")} />
    </form>
  );
}
