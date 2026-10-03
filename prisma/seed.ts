/**
 * Seeds the database from the CV (HSE Officer - Abdulrahman Hasan Habiba) and creates the admin user.
 *   npm run db:seed
 * Safe to run again: the admin is upserted, and content tables are only filled when they are empty.
 */
import "dotenv/config";
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
  const profileData = {
    nameEn: "Abdulrahman Hasan Habiba",
    nameAr: "عبد الرحمن حسن حبيبة",
    titleEn: "HSE Officer, Occupational Health & Safety Specialist",
    titleAr: "مسؤول سلامة وصحة مهنية وبيئة (HSE)",
    taglineEn: "I make sure that workers go home safely.",
    taglineAr: "أحرص على أن يعود العامل إلى بيته بسلامة.",
    summaryEn:
      "A certified HSE officer with a strong focus on site risk assessment, Permit to Work (PTW), and scaffolding safety across construction and engineering projects. I work to a zero-incident standard in high-risk environments.",
    summaryAr:
      "مسؤول سلامة معتمد، لدي خبرة قوية في تقييم المخاطر بالمواقع، وأنظمة تصاريح العمل (PTW)، وسلامة السقالات في مشروعات الإنشاءات والهندسة. أعمل لتحقيق معيار صفر حوادث في البيئات عالية الخطورة.",
    locationEn: "Alexandria, Egypt",
    locationAr: "الإسكندرية، مصر",
    relocationEn: "Open to relocation (KSA & UAE)",
    relocationAr: "مستعد للانتقال (السعودية والإمارات)",
    email: "abdulrahmanhabibh@gmail.com",
    phone: "+201113951795",
    linkedin: "https://linkedin.com/in/abdulrahman-hasan-habiba",
    cvUrl: "",
  };

  await db.profile.upsert({
    where: { id: 1 },
    create: { id: 1, ...profileData },
    update: profileData,
  });

  if ((await db.experience.count()) > 0) {
    console.log("Profile updated. Other content already exists. Skipping rest of content seed.");
    return;
  }

  await db.experience.create({
    data: {
      companyEn: "Global Company for General Contracting, Engineering Services & Scaffolding",
      companyAr: "الشركة العالمية للمقاولات العامة والخدمات الهندسية والسقالات",
      roleEn: "HSE Officer / Specialist",
      roleAr: "مسؤول / أخصائي سلامة وصحة مهنية",
      locationEn: "Alexandria, Egypt",
      locationAr: "الإسكندرية، مصر",
      startDate: new Date("2026-08-01T00:00:00.000Z"),
      endDate: null,
      sortOrder: 0,
      highlightsEn: [
        "Conduct daily HSE site inspections across general contracting and scaffolding operations to ensure compliance with international safety standards and company policy.",
        "Monitor and enforce the Permit to Work (PTW) system for high-risk activities: work at height, scaffold erection and dismantling, and hot work.",
        "Run Job Safety Analysis (JSA) and risk assessments before work starts, to identify hazards and set control measures.",
        "Lead daily Toolbox Talks (TBT) for site workers and subcontractors.",
        "Inspect scaffold structures, Scaff-Tag systems, fall protection equipment, harnesses and PPE.",
        "Support emergency response preparedness and coordinate first aid on site when required.",
        "Document daily site observations, record near-misses, and issue Corrective and Preventive Action (CAPA) reports to site engineers.",
      ],
      highlightsAr: [
        "إجراء فحوصات يومية للسلامة في مواقع المقاولات العامة وأعمال السقالات للتأكد من الالتزام بمعايير السلامة الدولية وسياسة الشركة.",
        "متابعة وتطبيق نظام تصاريح العمل (PTW) للأنشطة عالية الخطورة: العمل على الارتفاعات، وتركيب وفك السقالات، والأعمال الساخنة.",
        "إعداد تحليل سلامة الوظيفة (JSA) وتقييم المخاطر قبل بدء العمل لتحديد الأخطار ووضع إجراءات التحكم.",
        "قيادة اجتماعات سلامة يومية (Toolbox Talks) للعمال ومقاولي الباطن.",
        "فحص هياكل السقالات ونظام بطاقات السقالات (Scaff-Tag) ومعدات الحماية من السقوط وأحزمة الأمان ومعدات الوقاية الشخصية.",
        "دعم الاستعداد للطوارئ وتنسيق الإسعافات الأولية في الموقع عند الحاجة.",
        "توثيق ملاحظات السلامة اليومية وتسجيل الحوادث الوشيكة وإصدار تقارير الإجراءات التصحيحية والوقائية (CAPA) لمهندسي الموقع.",
      ],
    },
  });

  await db.certification.createMany({
    data: [
      {
        nameEn: "IOSH Managing Safely",
        nameAr: "IOSH إدارة السلامة (Managing Safely)",
        issuerEn: "Institution of Occupational Safety and Health (IOSH), UK",
        issuerAr: "معهد السلامة والصحة المهنية (IOSH)، المملكة المتحدة",
        sortOrder: 0,
      },
      {
        nameEn: "OSHA 30-Hour Construction Safety & Health",
        nameAr: "OSHA 30 ساعة: السلامة والصحة في الإنشاءات",
        issuerEn: "OSHAcademy, USA",
        issuerAr: "OSHAcademy، الولايات المتحدة",
        sortOrder: 1,
      },
      {
        nameEn: "OSHA 30-Hour General Industry Safety & Health",
        nameAr: "OSHA 30 ساعة: السلامة والصحة في الصناعة العامة",
        issuerEn: "OSHAcademy, USA",
        issuerAr: "OSHAcademy، الولايات المتحدة",
        sortOrder: 2,
      },
      {
        nameEn: "National OSH Specialist Certificate",
        nameAr: "شهادة أخصائي السلامة والصحة المهنية الوطنية",
        issuerEn: "National Institute for Occupational Safety and Health (NIOSH) / Ministry of Manpower, Egypt",
        issuerAr: "المعهد القومي للسلامة والصحة المهنية (NIOSH) / وزارة القوى العاملة، مصر",
        sortOrder: 3,
      },
      {
        nameEn: "First Aid, CPR & AED Certification",
        nameAr: "شهادة الإسعافات الأولية والإنعاش القلبي الرئوي (CPR) وجهاز AED",
        issuerEn: "Syndicate of Pharmacists (accredited nationally and internationally)",
        issuerAr: "نقابة الصيادلة (معتمدة محليًا ودوليًا)",
        sortOrder: 4,
      },
    ],
  });

  await db.education.create({
    data: {
      institutionEn: "Al-Azhar University",
      institutionAr: "جامعة الأزهر",
      degreeEn: "Bachelor of Science (B.Sc.)",
      degreeAr: "بكالوريوس العلوم",
      noteEn: "Overall grade: Very Good (GPA 3.6 / 4.0)",
      noteAr: "التقدير العام: جيد جدًا (المعدل التراكمي 3.6 من 4.0)",
      graduationYear: 2023,
      sortOrder: 0,
    },
  });

  await db.skillGroup.createMany({
    data: [
      {
        titleEn: "Safety frameworks & standards",
        titleAr: "أطر ومعايير السلامة",
        itemsEn: ["OSHA Construction & General Industry", "IOSH standards", "ISO 45001 awareness", "Egyptian OSH legislation"],
        itemsAr: ["OSHA للإنشاءات والصناعة العامة", "معايير IOSH", "الإلمام بمعيار ISO 45001", "تشريعات السلامة والصحة المهنية المصرية"],
        sortOrder: 0,
      },
      {
        titleEn: "Site safety operations",
        titleAr: "عمليات السلامة في الموقع",
        itemsEn: ["Scaffolding inspection & Scaff-Tag systems", "Work at height safety", "Fall protection", "Heavy equipment safety"],
        itemsAr: ["فحص السقالات ونظام Scaff-Tag", "سلامة العمل على الارتفاعات", "الحماية من السقوط", "سلامة المعدات الثقيلة"],
        sortOrder: 1,
      },
      {
        titleEn: "Risk & hazard management",
        titleAr: "إدارة المخاطر والأخطار",
        itemsEn: ["Risk assessment", "Job Safety Analysis (JSA / HIRA)", "Permit to Work (PTW) management", "Hazard identification"],
        itemsAr: ["تقييم المخاطر", "تحليل سلامة الوظيفة (JSA / HIRA)", "إدارة تصاريح العمل (PTW)", "تحديد الأخطار"],
        sortOrder: 2,
      },
      {
        titleEn: "Inspection & incident control",
        titleAr: "الفحص والتحكم في الحوادث",
        itemsEn: ["Daily site audits", "Near-miss reporting", "Incident investigation basics", "Corrective actions (CAPA)"],
        itemsAr: ["مراجعات الموقع اليومية", "الإبلاغ عن الحوادث الوشيكة", "أساسيات التحقيق في الحوادث", "الإجراءات التصحيحية (CAPA)"],
        sortOrder: 3,
      },
      {
        titleEn: "Communication & first aid",
        titleAr: "التواصل والإسعافات الأولية",
        itemsEn: ["Toolbox Talks (TBT) delivery", "Subcontractor safety oversight", "Emergency first aid & CPR"],
        itemsAr: ["تقديم اجتماعات Toolbox Talks", "الإشراف على سلامة مقاولي الباطن", "الإسعافات الأولية والإنعاش القلبي الرئوي"],
        sortOrder: 4,
      },
    ],
  });

  console.log("Content seeded from the CV.");
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
