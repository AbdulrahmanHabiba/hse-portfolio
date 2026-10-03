import { getTranslations } from "next-intl/server";
import type { ActionState } from "@/lib/action";
import { BilingualField, Form, TextField } from "@/components/dashboard/form-kit";

type Props = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  defaults?: Record<string, unknown>;
};

export async function CertificationForm({ action, defaults }: Props) {
  const t = await getTranslations("dashboard");
  return (
    <Form action={action} defaults={defaults} cancelHref="/dashboard/credentials">
      <BilingualField name="name" label={t("fields.certName")} />
      <BilingualField name="issuer" label={t("fields.issuer")} />
      <div className="grid gap-4 md:grid-cols-3">
        <TextField name="year" type="number" label={t("fields.year")} hint={t("credentials.yearHint")} />
        <TextField name="credentialUrl" type="url" label={t("fields.credentialUrl")} />
        <TextField name="sortOrder" type="number" label={t("fields.sortOrder")} hint={t("common.orderHint")} />
      </div>
    </Form>
  );
}
