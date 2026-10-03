import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { saveCertification } from "@/features/certifications/actions";
import { PageTitle } from "@/components/dashboard/page-title";
import { CertificationForm } from "../../_components/certification-form";

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [t, row] = await Promise.all([getTranslations("dashboard.credentials"), db.certification.findUnique({ where: { id } })]);
  if (!row) notFound();

  return (
    <>
      <PageTitle title={t("editCertification")} />
      <CertificationForm action={saveCertification.bind(null, id)} defaults={row} />
    </>
  );
}
