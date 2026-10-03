import { getTranslations } from "next-intl/server";
import { saveCertification } from "@/features/certifications/actions";
import { PageTitle } from "@/components/dashboard/page-title";
import { CertificationForm } from "../../_components/certification-form";

export default async function NewCertificationPage() {
  const t = await getTranslations("dashboard.credentials");
  return (
    <>
      <PageTitle title={t("newCertification")} />
      <CertificationForm action={saveCertification.bind(null, null)} defaults={{ sortOrder: 0 }} />
    </>
  );
}
