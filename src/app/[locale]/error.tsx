"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("error");
  return (
    <main className="flex flex-1 items-center">
      <Container className="py-24">
        <h1 className="text-3xl font-semibold">{t("title")}</h1>
        <p className="mt-3 max-w-md text-steel">{t("body")}</p>
        <Button className="mt-8" onClick={reset}>{t("retry")}</Button>
      </Container>
    </main>
  );
}
