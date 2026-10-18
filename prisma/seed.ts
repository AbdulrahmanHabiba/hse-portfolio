/**
 * Seeds the database from the CV (HSE Officer - Abdulrahman Hasan Habiba) and creates the admin user.
 *   npm run db:seed
 * Safe to run again: the admin is upserted, and content tables are only filled when they are empty.
 */
import "dotenv/config";
import { cvProfile, cvExperience, cvCertifications, cvEducation, cvSkillGroups } from "../src/features/portfolio/cv-content";
import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const db = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL ?? "" }),
});

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.");

  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.upsert({ where: { email }, create: { email, passwordHash }, update: { passwordHash } });
  console.log(`Admin ready: ${email}`);
}

async function seedContent() {
  // Seed creates initial records only; it never erases dashboard edits.
  await db.profile.upsert({
    where: { id: 1 },
    create: { id: 1, ...cvProfile },
    update: {}, 
  });
  if ((await db.experience.count()) === 0) await db.experience.createMany({ data: cvExperience });
  if ((await db.certification.count()) === 0) await db.certification.createMany({ data: cvCertifications });
  if ((await db.education.count()) === 0) await db.education.createMany({ data: cvEducation });
  if ((await db.skillGroup.count()) === 0) await db.skillGroup.createMany({ data: cvSkillGroups });
  console.log("Initialized missing portfolio content from CV.");
}

async function main() {
  await seedAdmin();
  await seedContent();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
