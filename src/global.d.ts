import type { routing } from "@/i18n/routing";
import type en from "./messages/en.json";

// Makes next-intl keys type-safe: t("nav.home") is checked against messages/en.json at compile time.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof en;
  }
}
