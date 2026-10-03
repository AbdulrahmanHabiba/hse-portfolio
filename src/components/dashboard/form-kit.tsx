"use client";

import { createContext, use, type ReactNode } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { initialState, type ActionState } from "@/lib/action";
import { buttonStyles, Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Tiny form toolkit for the dashboard.
 * <Form> owns useActionState and shares the result (errors + echoed values) with every field through context,
 * so each page only declares fields and never repeats the wiring.
 */
type Defaults = Record<string, unknown>;
type FormAction = (prev: ActionState, formData: FormData) => Promise<ActionState>;

const FormContext = createContext<{ state: ActionState; defaults: Defaults }>({
  state: initialState,
  defaults: {},
});

function useField(name: string) {
  const { state, defaults } = use(FormContext);
  const value = state.values?.[name] ?? String(defaults[name] ?? "");
  const hasError = Boolean(state.fieldErrors?.[name]?.length);
  return { value, hasError };
}

const inputClass =
  "mt-1.5 w-full rounded-md border border-ink/30 bg-white px-3 py-2.5 text-base outline-none transition-colors focus:border-ink aria-[invalid=true]:border-stop aria-[invalid=true]:bg-red-50";

function SubmitButton() {
  const t = useTranslations("dashboard.common");
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? t("saving") : t("save")}
    </Button>
  );
}

export function Form({
  action,
  defaults = {},
  cancelHref,
  children,
}: {
  action: FormAction;
  defaults?: Defaults;
  cancelHref?: string;
  children: ReactNode;
}) {
  const t = useTranslations("dashboard");
  const [state, formAction] = useActionState(action, initialState);

  return (
    <FormContext value={{ state, defaults }}>
      <form action={formAction} className="space-y-6" noValidate>
        {state.ok && state.message === "saved" ? (
          <p role="status" className="flex items-center gap-2 rounded-md bg-safe-soft px-4 py-3 font-medium text-safe">
            <CheckIcon strokeWidth={3} /> {t("feedback.saved")}
          </p>
        ) : null}
        {!state.ok && state.message === "validation" ? (
          <p role="alert" className="rounded-md border border-stop/40 bg-red-50 px-4 py-3 font-medium text-stop">
            {t("feedback.validation")}
          </p>
        ) : null}

        {children}

        <div className="flex flex-wrap gap-3 border-t border-line pt-6">
          <SubmitButton />
          {cancelHref ? (
            <Link href={cancelHref} className={buttonStyles({ variant: "secondary" })}>
              {t("common.cancel")}
            </Link>
          ) : null}
        </div>
      </form>
    </FormContext>
  );
}

type FieldProps = {
  name: string;
  label: string;
  hint?: string;
  type?: "text" | "email" | "url" | "number" | "month" | "tel";
  rtl?: boolean;
  required?: boolean;
  className?: string;
};

export function TextField({ name, label, hint, type = "text", rtl, required, className }: FieldProps) {
  const { value, hasError } = useField(name);
  return (
    <div className={className}>
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <input
        key={value}
        id={name}
        name={name}
        type={type}
        defaultValue={value}
        dir={rtl ? "rtl" : type === "text" ? "auto" : "ltr"}
        required={required}
        aria-invalid={hasError || undefined}
        className={cn(inputClass, type !== "text" && !rtl && "text-start")}
      />
      {hint ? <p className="mt-1 text-sm text-steel">{hint}</p> : null}
    </div>
  );
}

export function AreaField({ name, label, hint, rtl, rows = 4, className }: FieldProps & { rows?: number }) {
  const { value, hasError } = useField(name);
  return (
    <div className={className}>
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <textarea
        key={value}
        id={name}
        name={name}
        rows={rows}
        defaultValue={value}
        dir={rtl ? "rtl" : "auto"}
        aria-invalid={hasError || undefined}
        className={inputClass}
      />
      {hint ? <p className="mt-1 text-sm text-steel">{hint}</p> : null}
    </div>
  );
}

/** Renders `${name}En` and `${name}Ar` side by side. The Arabic input is right-to-left. */
export function BilingualField({
  name,
  label,
  hint,
  area,
  rows,
}: {
  name: string;
  label: string;
  hint?: string;
  area?: boolean;
  rows?: number;
}) {
  const t = useTranslations("dashboard.common");
  const Field = area ? AreaField : TextField;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field name={`${name}En`} label={`${label} (${t("english")})`} hint={hint} rows={rows} />
      <Field name={`${name}Ar`} label={`${label} (${t("arabic")})`} hint={hint} rows={rows} rtl />
    </div>
  );
}

/** A delete / toggle button that submits a bound Server Action, with an optional confirm step. */
export function ActionButton({
  action,
  label,
  confirmText,
  variant = "danger",
}: {
  action: () => Promise<void>;
  label: string;
  confirmText?: string;
  variant?: "danger" | "secondary";
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (confirmText && !window.confirm(confirmText)) event.preventDefault();
      }}
    >
      <Button type="submit" size="sm" variant={variant}>
        {label}
      </Button>
    </form>
  );
}
