"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { sendMessage } from "@/features/messages/actions";
import { initialState } from "@/lib/action";
import { buttonStyles } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";

const inputClass =
  "mt-1.5 w-full rounded-md border border-ink/30 bg-surface px-3.5 py-2.5 text-base outline-none transition-colors focus:border-ink aria-[invalid=true]:border-stop";

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={buttonStyles()}>
      {pending ? pendingLabel : label}
    </button>
  );
}

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, action] = useActionState(sendMessage, initialState);
  const errors = state.fieldErrors ?? {};

  if (state.ok) {
    return (
      <div role="status" className="rounded-xl border-2 border-safe bg-safe-soft p-6">
        <p className="flex items-center gap-2 font-display text-xl font-semibold text-safe">
          <CheckIcon strokeWidth={3} /> {t("sentTitle")}
        </p>
        <p className="mt-2">{t("sentBody")}</p>
      </div>
    );
  }

  const field = (name: "name" | "email" | "body") => ({
    id: name,
    name,
    defaultValue: state.values?.[name] ?? "",
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    required: true,
  });

  return (
    <form action={action} className="space-y-5" noValidate>
      {/* Honeypot, hidden from people and from screen readers */}
      <div aria-hidden className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="font-medium">{t("name")}</label>
        <input {...field("name")} type="text" autoComplete="name" className={inputClass} />
        {errors.name ? <p id="name-error" className="mt-1 text-sm text-stop">{t("invalid")}</p> : null}
      </div>
      <div>
        <label htmlFor="email" className="font-medium">{t("email")}</label>
        <input {...field("email")} type="email" autoComplete="email" dir="ltr" className={`${inputClass} text-start`} />
        {errors.email ? <p id="email-error" className="mt-1 text-sm text-stop">{t("invalid")}</p> : null}
      </div>
      <div>
        <label htmlFor="body" className="font-medium">{t("message")}</label>
        <textarea {...field("body")} rows={6} className={inputClass} />
        {errors.body ? <p id="body-error" className="mt-1 text-sm text-stop">{t("invalidMessage")}</p> : null}
      </div>
      <SubmitButton label={t("send")} pendingLabel={t("sending")} />
    </form>
  );
}
