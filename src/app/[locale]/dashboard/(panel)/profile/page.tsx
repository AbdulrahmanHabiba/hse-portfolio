import { getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { saveProfile } from "@/features/profile/actions";
import { PageTitle } from "@/components/dashboard/page-title";
import { BilingualField, Form, TextField } from "@/components/dashboard/form-kit";

export default async function ProfilePage() {
  const [t, profile] = await Promise.all([getTranslations("dashboard"), db.profile.findUnique({ where: { id: 1 } })]);

  return (
    <>
      <PageTitle title={t("profile.title")} description={t("profile.description")} />
      <Form action={saveProfile} defaults={profile ?? {}}>
        <BilingualField name="name" label={t("fields.name")} />
        <BilingualField name="title" label={t("fields.jobTitle")} />
        <BilingualField name="tagline" label={t("fields.tagline")} hint={t("profile.taglineHint")} area rows={2} />
        <BilingualField name="summary" label={t("fields.summary")} area rows={5} />
        <BilingualField name="location" label={t("fields.location")} />
        <BilingualField name="relocation" label={t("fields.relocation")} hint={t("profile.relocationHint")} />
        <div className="grid gap-4 md:grid-cols-2">
          <TextField name="email" type="email" label={t("fields.email")} />
          <TextField name="phone" type="tel" label={t("fields.phone")} />
          <TextField name="linkedin" type="url" label={t("fields.linkedin")} />
          <TextField name="cvUrl" type="url" label={t("fields.cvUrl")} hint={t("profile.cvHint")} />
        </div>
      </Form>
    </>
  );
}
