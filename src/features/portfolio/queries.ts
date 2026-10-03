import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import type { Locale } from "@/i18n/routing";
import type {
  CertificationView,
  EducationView,
  ExperienceView,
  ProfileView,
  SkillGroupView,
} from "./types";

/**
 * Public read layer.
 *  - Results are cached and tagged "portfolio".
 *  - Every dashboard Server Action calls `updateTag(PORTFOLIO_TAG)`, so edits show up instantly.
 *  - Localization happens HERE, so components just receive plain strings.
 */
export const PORTFOLIO_TAG = "portfolio";
const options = { tags: [PORTFOLIO_TAG] };

const pick = (locale: Locale, en: string, ar: string) => (locale === "ar" ? ar : en);

export const getProfile = unstable_cache(
  async (locale: Locale): Promise<ProfileView | null> => {
    try {
      if (!process.env.DATABASE_URL) return null;
      const p = await db.profile.findUnique({ where: { id: 1 } });
      if (!p) return null;
      return {
        name: pick(locale, p.nameEn, p.nameAr),
        title: pick(locale, p.titleEn, p.titleAr),
        tagline: pick(locale, p.taglineEn, p.taglineAr),
        summary: pick(locale, p.summaryEn, p.summaryAr),
        location: pick(locale, p.locationEn, p.locationAr),
        relocation: pick(locale, p.relocationEn, p.relocationAr),
        email: p.email,
        phone: p.phone,
        linkedin: p.linkedin,
        cvUrl: p.cvUrl,
      };
    } catch (error) {
      console.error("[getProfile] Database query failed:", error);
      return null;
    }
  },
  ["portfolio-profile"],
  options,
);

export const getExperience = unstable_cache(
  async (locale: Locale): Promise<ExperienceView[]> => {
    try {
      if (!process.env.DATABASE_URL) return [];
      const rows = await db.experience.findMany({
        orderBy: [{ sortOrder: "asc" }, { startDate: "desc" }],
      });
      return rows.map((r) => ({
        id: r.id,
        company: pick(locale, r.companyEn, r.companyAr),
        role: pick(locale, r.roleEn, r.roleAr),
        location: pick(locale, r.locationEn, r.locationAr),
        startDate: r.startDate.toISOString(),
        endDate: r.endDate ? r.endDate.toISOString() : null,
        highlights: locale === "ar" ? r.highlightsAr : r.highlightsEn,
      }));
    } catch (error) {
      console.error("[getExperience] Database query failed:", error);
      return [];
    }
  },
  ["portfolio-experience"],
  options,
);

export const getCertifications = unstable_cache(
  async (locale: Locale): Promise<CertificationView[]> => {
    try {
      if (!process.env.DATABASE_URL) return [];
      const rows = await db.certification.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
      return rows.map((r) => ({
        id: r.id,
        name: pick(locale, r.nameEn, r.nameAr),
        issuer: pick(locale, r.issuerEn, r.issuerAr),
        year: r.year,
        credentialUrl: r.credentialUrl,
      }));
    } catch (error) {
      console.error("[getCertifications] Database query failed:", error);
      return [];
    }
  },
  ["portfolio-certifications"],
  options,
);

export const getEducation = unstable_cache(
  async (locale: Locale): Promise<EducationView[]> => {
    try {
      if (!process.env.DATABASE_URL) return [];
      const rows = await db.education.findMany({ orderBy: [{ sortOrder: "asc" }, { graduationYear: "desc" }] });
      return rows.map((r) => ({
        id: r.id,
        institution: pick(locale, r.institutionEn, r.institutionAr),
        degree: pick(locale, r.degreeEn, r.degreeAr),
        note: pick(locale, r.noteEn, r.noteAr),
        graduationYear: r.graduationYear,
      }));
    } catch (error) {
      console.error("[getEducation] Database query failed:", error);
      return [];
    }
  },
  ["portfolio-education"],
  options,
);

export const getSkillGroups = unstable_cache(
  async (locale: Locale): Promise<SkillGroupView[]> => {
    try {
      if (!process.env.DATABASE_URL) return [];
      const rows = await db.skillGroup.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
      return rows.map((r) => ({
        id: r.id,
        title: pick(locale, r.titleEn, r.titleAr),
        items: locale === "ar" ? r.itemsAr : r.itemsEn,
      }));
    } catch (error) {
      console.error("[getSkillGroups] Database query failed:", error);
      return [];
    }
  },
  ["portfolio-skills"],
  options,
);
