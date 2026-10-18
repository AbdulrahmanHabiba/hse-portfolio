/**
 * Explicit one-time content synchronization. Run with a backup of production data.
 * Updates profile and CV-linked records; preserves unrelated dashboard-created entries.
 * npm run db:sync-cv
 */
import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";
import { cvProfile, cvExperience, cvCertifications, cvEducation, cvSkillGroups } from "../src/features/portfolio/cv-content";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const db = new PrismaClient({ adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  const oldExperience = await db.experience.findMany({ orderBy: { sortOrder: "asc" } });
  const oldCertificates = await db.certification.findMany({ orderBy: { sortOrder: "asc" } });
  const oldEducation = await db.education.findMany({ orderBy: { sortOrder: "asc" } });
  const oldSkills = await db.skillGroup.findMany({ orderBy: { sortOrder: "asc" } });
  await db.$transaction(async (tx) => {
    await tx.profile.upsert({ where: { id: 1 }, create: { id: 1, ...cvProfile }, update: cvProfile });
    for (const row of cvExperience) {
      const existing = oldExperience.find((e) => e.startDate.getTime() === row.startDate.getTime() && e.companyEn === row.companyEn) ??
        oldExperience.find((e) => e.companyEn === row.companyEn || (row.sortOrder === 0 && e.companyEn.includes("Global Company")));
      if (existing) await tx.experience.update({ where: { id: existing.id }, data: row });
      else await tx.experience.create({ data: row });
    }
    for (const row of cvCertifications) {
      const existing = oldCertificates.find((c) => c.nameEn === row.nameEn || c.sortOrder === row.sortOrder);
      if (existing) await tx.certification.update({ where: { id: existing.id }, data: row });
      else await tx.certification.create({ data: row });
    }
    for (const row of cvEducation) {
      const existing = oldEducation.find((e) => e.institutionEn.includes("Al-Azhar"));
      if (existing) await tx.education.update({ where: { id: existing.id }, data: row });
      else await tx.education.create({ data: row });
    }
    for (const row of cvSkillGroups) {
      const existing = oldSkills.find((s) => s.titleEn === row.titleEn || s.sortOrder === row.sortOrder);
      if (existing) await tx.skillGroup.update({ where: { id: existing.id }, data: row });
      else await tx.skillGroup.create({ data: row });
    }
  });
  console.log("CV records synchronized. Other records were preserved.");
}
main().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => db.$disconnect());
