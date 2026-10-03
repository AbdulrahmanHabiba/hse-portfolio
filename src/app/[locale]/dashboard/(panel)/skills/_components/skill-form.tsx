import { getTranslations } from "next-intl/server";
import type { ActionState } from "@/lib/action";
import { BilingualField, Form, TextField } from "@/components/dashboard/form-kit";

type Props = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  defaults?: Record<string, unknown>;
};

export async function SkillForm({ action, defaults }: Props) {
  const t = await getTranslations("dashboard");
  return (
    <Form action={action} defaults={defaults} cancelHref="/dashboard/skills">
      <BilingualField name="title" label={t("fields.skillTitle")} />
      <BilingualField name="items" label={t("fields.items")} hint={t("skills.itemsHint")} area rows={8} />
      <TextField name="sortOrder" type="number" label={t("fields.sortOrder")} hint={t("common.orderHint")} className="max-w-xs" />
    </Form>
  );
}
