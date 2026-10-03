import { getTranslations } from "next-intl/server";
import type { ActionState } from "@/lib/action";
import { BilingualField, Form, TextField } from "@/components/dashboard/form-kit";

type Props = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  defaults?: Record<string, unknown>;
};

/** Shared by the "new" and "edit" pages. */
export async function ExperienceForm({ action, defaults }: Props) {
  const t = await getTranslations("dashboard");
  return (
    <Form action={action} defaults={defaults} cancelHref="/dashboard/experience">
      <BilingualField name="company" label={t("fields.company")} />
      <BilingualField name="role" label={t("fields.role")} />
      <BilingualField name="location" label={t("fields.location")} />
      <div className="grid gap-4 md:grid-cols-3">
        <TextField name="startDate" type="month" label={t("fields.startDate")} />
        <TextField name="endDate" type="month" label={t("fields.endDate")} hint={t("experience.endHint")} />
        <TextField name="sortOrder" type="number" label={t("fields.sortOrder")} hint={t("common.orderHint")} />
      </div>
      <BilingualField name="highlights" label={t("fields.highlights")} hint={t("common.linesHint")} area rows={8} />
    </Form>
  );
}
