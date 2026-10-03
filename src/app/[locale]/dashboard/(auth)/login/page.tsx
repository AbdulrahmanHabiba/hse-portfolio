import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getSession } from "@/lib/dal";
import { LoginForm } from "./login-form";
import { LogoMark } from "@/components/site/logo-mark";

export default async function LoginPage() {
  // Already signed in? Skip the form.
  if (await getSession()) redirect({ href: "/dashboard", locale: await getLocale() });

  const t = await getTranslations("dashboard.login");

  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border-2 border-ink bg-surface p-8 shadow-[8px_10px_0_rgba(22,34,46,0.14)]">
        <LogoMark className="size-10" />
        <h1 className="mt-5 text-3xl font-semibold">{t("title")}</h1>
        <p className="mt-2 text-steel">{t("subtitle")}</p>
        <LoginForm />
      </div>
    </main>
  );
}
