import { getTranslations } from "next-intl/server";
import type { ActionState } from "@/lib/action";
import { BilingualField, Form, TextField } from "@/components/dashboard/form-kit";

type Props = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  defaults?: Record<string, unknown>;
};

export async function EducationForm({ action, defaults }: Props) {
  const t = await getTranslations("dashboard");
  return (
    <Form action={action} defaults={defaults} cancelHref="/dashboard/credentials">
      <BilingualField name="institution" label={t("fields.institution")} />
      <BilingualField name="degree" label={t("fields.degree")} />
      <BilingualField name="note" label={t("fields.note")} hint={t("credentials.noteHint")} />
      <div className="grid gap-4 md:grid-cols-2">
        <TextField name="graduationYear" type="number" label={t("fields.graduationYear")} />
        <TextField name="sortOrder" type="number" label={t("fields.sortOrder")} hint={t("common.orderHint")} />
      </div>
    </Form>
  );
}
