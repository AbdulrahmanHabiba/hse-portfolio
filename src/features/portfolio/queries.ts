import "server-only";
import { cvProfile, cvExperience, cvCertifications, cvEducation, cvSkillGroups } from "./cv-content";
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


const useCv = () => process.env.PORTFOLIO_CONTENT_SOURCE !== "database";
const profileFromCv = (locale: Locale): ProfileView => ({
 name: pick(locale, cvProfile.nameEn, cvProfile.nameAr),
 title: pick(locale, cvProfile.titleEn, cvProfile.titleAr),
 tagline: pick(locale, cvProfile.taglineEn, cvProfile.taglineAr),
 summary: pick(locale, cvProfile.summaryEn, cvProfile.summaryAr),
 location: pick(locale, cvProfile.locationEn, cvProfile.locationAr),
 relocation: "", email: cvProfile.email, phone: cvProfile.phone,
 linkedin: cvProfile.linkedin, cvUrl: cvProfile.cvUrl
});
const experienceFromCv = (locale: Locale): ExperienceView[] => cvExperience.map((e,i) => ({
 id: "cv-experience-"+i, company: pick(locale,e.companyEn,e.companyAr),
 role: pick(locale,e.roleEn,e.roleAr), location: pick(locale,e.locationEn,e.locationAr),
 startDate: e.startDate.toISOString(), endDate: e.endDate ? e.endDate.toISOString() : null,
 highlights: locale === "ar" ? e.highlightsAr : e.highlightsEn
}));
const certsFromCv = (locale: Locale): CertificationView[] => cvCertifications.map((e,i) => ({
 id: "cv-cert-"+i, name: pick(locale,e.nameEn,e.nameAr),
 issuer: pick(locale,e.issuerEn,e.issuerAr), year: null, credentialUrl: ""
}));
const educationFromCv = (locale: Locale): EducationView[] => cvEducation.map((e,i) => ({
 id: "cv-education-"+i, institution: pick(locale,e.institutionEn,e.institutionAr),
 degree: pick(locale,e.degreeEn,e.degreeAr), note: pick(locale,e.noteEn,e.noteAr),
 graduationYear: e.graduationYear
}));
const skillsFromCv = (locale: Locale): SkillGroupView[] => cvSkillGroups.map((e,i) => ({
 id: "cv-skill-"+i, title: pick(locale,e.titleEn,e.titleAr),
 items: locale === "ar" ? e.itemsAr : e.itemsEn
}));

export const getProfile = unstable_cache(
  async (locale: Locale): Promise<ProfileView | null> => {
    if (useCv()) return profileFromCv(locale);
    try {
      if (!process.env.DATABASE_URL) return profileFromCv(locale);
      const p = await db.profile.findUnique({ where: { id: 1 } });
      if (!p) return profileFromCv(locale);
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
      return profileFromCv(locale);
    }
  },
  ["portfolio-profile"],
  options,
);

export const getExperience = unstable_cache(
  async (locale: Locale): Promise<ExperienceView[]> => {
    if (useCv()) return experienceFromCv(locale);
    try {
      if (!process.env.DATABASE_URL) return experienceFromCv(locale);
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
      return experienceFromCv(locale);
    }
  },
  ["portfolio-experience"],
  options,
);

export const getCertifications = unstable_cache(
  async (locale: Locale): Promise<CertificationView[]> => {
    if (useCv()) return certsFromCv(locale);
    try {
      if (!process.env.DATABASE_URL) return certsFromCv(locale);
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
      return certsFromCv(locale);
    }
  },
  ["portfolio-certifications"],
  options,
);

export const getEducation = unstable_cache(
  async (locale: Locale): Promise<EducationView[]> => {
    if (useCv()) return educationFromCv(locale);
    try {
      if (!process.env.DATABASE_URL) return educationFromCv(locale);
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
      return educationFromCv(locale);
    }
  },
  ["portfolio-education"],
  options,
);

export const getSkillGroups = unstable_cache(
  async (locale: Locale): Promise<SkillGroupView[]> => {
    if (useCv()) return skillsFromCv(locale);
    try {
      if (!process.env.DATABASE_URL) return skillsFromCv(locale);
      const rows = await db.skillGroup.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
      return rows.map((r) => ({
        id: r.id,
        title: pick(locale, r.titleEn, r.titleAr),
        items: locale === "ar" ? r.itemsAr : r.itemsEn,
      }));
    } catch (error) {
      console.error("[getSkillGroups] Database query failed:", error);
      return skillsFromCv(locale);
    }
  },
  ["portfolio-skills"],
  options,
);
