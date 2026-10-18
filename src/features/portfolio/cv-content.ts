/**
 * CV-aligned bilingual portfolio content. Source: October 2026 CV (November 2025 start).
 * This is a content template, not independent evidence of credential validity.
 */
export const cvProfile = {
  nameEn: "Abdulrahman Hasan Habiba",
  nameAr: "عبد الرحمن حسن حبيبة",
  titleEn: "Safety Engineer / Occupational Health & Safety Specialist",
  titleAr: "مهندس سلامة / أخصائي السلامة والصحة المهنية",
  taglineEn: "Practical site safety. Clear communication. Safer work.",
  taglineAr: "سلامة ميدانية عملية، وتواصل واضح، وبيئة عمل أكثر أمانًا.",
  summaryEn: "Field-focused HSE specialist supporting contractor activities at TITAN Cement Egypt's Alexandria plant. Experience includes daily safety monitoring across construction, scaffolding, mechanical maintenance and welding, contributing to risk assessment reviews, checking tools and equipment, delivering toolbox talks and following up on observed hazards. Bachelor of Science graduate with IOSH, OSHA, first aid and fire safety training; ISO 45001 internal auditor training attended.",
  summaryAr: "أخصائي سلامة وصحة مهنية يعمل ميدانيًا في أنشطة المقاولين بمصنع تيتان للأسمنت بالإسكندرية. تشمل خبراته متابعة السلامة اليومية في أعمال الإنشاءات والسقالات والصيانة الميكانيكية واللحام، والمشاركة في مراجعة تقييم المخاطر وفحص الأدوات والمعدات بصريًا وتقديم محاضرات السلامة اليومية ومتابعة المخاطر الملحوظة. حاصل على بكالوريوس العلوم وتدريبات IOSH وOSHA والإسعافات الأولية ومكافحة الحريق، وحضر تدريب المراجع الداخلي ISO 45001.",
  locationEn: "Alexandria, Egypt",
  locationAr: "الإسكندرية، مصر",
  relocationEn: "",
  relocationAr: "",
  email: "abdulrahmanhabibh@gmail.com",
  phone: "+201113951795",
  linkedin: "https://linkedin.com/in/abdulrahman-hasan-habiba",
  cvUrl: "https://drive.google.com/file/d/1BHXfHaFG1TsC897kc8iIiXsy4aKoPLWf/view?usp=sharing",
};
export const cvExperience = [{
  companyEn: "Global Company for General Contracting, Engineering Services & Scaffolding",
  companyAr: "الشركة العالمية للمقاولات العامة والخدمات الهندسية والسقالات",
  roleEn: "Safety Engineer — TITAN Cement (APCC), El-Max",
  roleAr: "مهندس سلامة — موقع تيتان للأسمنت (APCC)، المكس",
  locationEn: "Alexandria, Egypt",
  locationAr: "الإسكندرية، مصر",
  startDate: new Date("2025-11-01T00:00:00.000Z"),
  endDate: null,
  sortOrder: 0,
  highlightsEn: [
    "Monitor HSE compliance across construction, scaffolding, mechanical maintenance and welding activities; identify hazards and communicate practical control measures.",
    "Monitor scaffold erection, dismantling, access and use, focusing on work-at-height hazards and safe access arrangements.",
    "Participate in task risk assessment reviews and identify hazards arising from changing site conditions.",
    "Carry out routine visual safety checks on mechanical tools and equipment, including angle grinders and welding machines, and report concerns.",
    "Deliver daily toolbox talks covering task-specific hazards, safe work methods, personal protective equipment and accident prevention.",
    "Follow up on observed unsafe conditions with workers and supervisors and communicate corrective measures.",
    "Check housekeeping and access routes for obstructions, trip hazards and unsafe material storage.",
    "Attend site safety training sessions, including workplace safety and risk management."
  ],
  highlightsAr: [
    "متابعة الالتزام بإجراءات السلامة في أعمال الإنشاءات والسقالات والصيانة الميكانيكية واللحام، وتحديد الأخطار والتواصل بشأن وسائل التحكم المناسبة.",
    "متابعة تركيب السقالات وفكها وطرق الوصول إليها واستخدامها مع التركيز على مخاطر العمل على ارتفاع.",
    "المشاركة في مراجعة تقييم مخاطر المهام وتحديد الأخطار المرتبطة بتغير ظروف الموقع.",
    "إجراء فحوصات سلامة بصرية دورية للأدوات والمعدات، ومنها الصاروخ وماكينات اللحام، والإبلاغ عن الملاحظات.",
    "تقديم محاضرات السلامة اليومية حول أخطار العمل وطرق التنفيذ الآمن ومعدات الوقاية ومنع الحوادث.",
    "متابعة الحالات غير الآمنة مع العمال والمشرفين وإبلاغهم بالإجراءات التصحيحية.",
    "متابعة نظافة وترتيب الموقع وسلامة الممرات والتخزين ورصد مخاطر التعثر والعوائق.",
    "حضور جلسات تدريبية داخل الموقع في السلامة المهنية وإدارة المخاطر."
  ]
}];
// Programming experience follows graduation and ends before the HSE position.
cvExperience.push({
  companyEn: "Independent Web Development", companyAr: "تطوير مواقع وتطبيقات الويب بشكل مستقل",
  roleEn: "Frontend / Full-Stack Web Developer", roleAr: "مطور واجهات وتطبيقات ويب",
  locationEn: "Egypt · Remote", locationAr: "مصر · عن بُعد",
  startDate: new Date("2023-08-01T00:00:00.000Z"),
  endDate: new Date("2025-11-01T00:00:00.000Z"),
  sortOrder: 1,
  highlightsEn: ["Built responsive web interfaces with React, Next.js, JavaScript and TypeScript.", "Worked with APIs, databases and authentication in web application projects.", "Created portfolio, ordering and e-commerce applications."],
  highlightsAr: ["تطوير واجهات ويب متجاوبة باستخدام React وNext.js وJavaScript وTypeScript.", "التعامل مع واجهات API وقواعد البيانات والمصادقة في تطبيقات الويب.", "تنفيذ مشاريع بورتفوليو وطلب الطعام والتجارة الإلكترونية."]
});
export const cvCertifications = [
  { nameEn: "IOSH Managing Safely (UK)", nameAr: "IOSH إدارة السلامة بأمان (المملكة المتحدة)", issuerEn: "IOSH; HSE Professional — Trainer: Eng. Abdelrahman Adel", issuerAr: "IOSH؛ HSE Professional — المدرب: م. عبد الرحمن عادل" },
  { nameEn: "ISO 45001:2018 Internal Auditor — Training Attended", nameAr: "ISO 45001:2018 مراجع داخلي — حضور تدريب", issuerEn: "EasyT — Eng. Hossam Mostafa Eid", issuerAr: "EasyT — م. حسام مصطفى عيد" },
  { nameEn: "OSHA Construction Safety — 30 Hours (USA)", nameAr: "OSHA سلامة الإنشاءات — 30 ساعة (الولايات المتحدة)", issuerEn: "OSHAcademy; HSE Professional — Trainer: Eng. Sabry M. Sherif", issuerAr: "OSHAcademy؛ HSE Professional — المدرب: م. صبري محمد شريف" },
  { nameEn: "OSHA General Industry Safety — 30 Hours (USA)", nameAr: "OSHA سلامة الصناعة العامة — 30 ساعة (الولايات المتحدة)", issuerEn: "OSHAcademy; HSE Professional — Trainer: Eng. Sabry M. Sherif", issuerAr: "OSHAcademy؛ HSE Professional — المدرب: م. صبري محمد شريف" },
  { nameEn: "Occupational Safety and Health Specialist — Level A", nameAr: "أخصائي السلامة والصحة المهنية — الدرجة الأولى (أ)", issuerEn: "National Institute of Occupational Safety and Health (NIOSH Egypt)", issuerAr: "المعهد القومي للسلامة والصحة المهنية — مصر" },
  { nameEn: "Fire Safety & Emergency Preparedness and Response", nameAr: "مكافحة الحريق والاستعداد والاستجابة للطوارئ", issuerEn: "SafeXpert Training & Consultation Services — Eng. Sabry M. Sherif", issuerAr: "SafeXpert للتدريب والاستشارات — م. صبري محمد شريف" },
  { nameEn: "First Aid and Basic Life Support (BLS)", nameAr: "الإسعافات الأولية ودعم الحياة الأساسي (BLS)", issuerEn: "Egyptian Pharmacists Syndicate", issuerAr: "نقابة صيادلة مصر" },
  { nameEn: "ISO 9001:2026 Updates — Webinar Attendance", nameAr: "مستجدات ISO 9001:2026 — حضور ندوة", issuerEn: "National Quality Institute", issuerAr: "المعهد القومي للجودة" }
].map((c, sortOrder) => ({ ...c, sortOrder, year: null, credentialUrl: "" }));
export const cvEducation = [{
  institutionEn: "Faculty of Science, Al-Azhar University",
  institutionAr: "كلية العلوم، جامعة الأزهر",
  degreeEn: "Bachelor of Science — Computer Science and Mathematics",
  degreeAr: "بكالوريوس العلوم — علوم الحاسب والرياضيات",
  noteEn: "Graduated July 2023 · Very Good · GPA 3.6/4.0 · Two years of Physics Department coursework",
  noteAr: "تخرج يوليو 2023 · جيد جدًا · المعدل 3.6 من 4 · دراسة مقررات بقسم الفيزياء لمدة عامين",
  graduationYear: 2023,
  sortOrder: 0
}];
export const cvSkillGroups = [
  { titleEn: "Site safety and risk awareness", titleAr: "السلامة الميدانية والوعي بالمخاطر", itemsEn: ["Hazard identification and risk assessment reviews", "Scaffolding and work-at-height safety monitoring", "Safe access, housekeeping and material storage", "Visual checks of tools and equipment"], itemsAr: ["تحديد الأخطار والمشاركة في مراجعة تقييم المخاطر", "متابعة سلامة السقالات والعمل على ارتفاع", "سلامة الممرات وترتيب الموقع وتخزين المواد", "الفحص البصري للأدوات والمعدات"] },
  { titleEn: "Communication and training", titleAr: "التواصل والتدريب", itemsEn: ["Daily toolbox talks", "Communicating controls to workers and supervisors", "Following up on unsafe conditions", "Fire safety, first aid and emergency preparedness training"], itemsAr: ["محاضرات السلامة اليومية", "التواصل مع العمال والمشرفين بشأن إجراءات التحكم", "متابعة الحالات غير الآمنة", "التدريب على مكافحة الحريق والإسعافات والطوارئ"] },
  { titleEn: "Computer applications", titleAr: "تطبيقات الحاسب", itemsEn: ["Microsoft Excel", "Microsoft Word and PowerPoint", "Spreadsheets, documentation and site reporting"], itemsAr: ["مايكروسوفت إكسل", "مايكروسوفت وورد وباوربوينت", "الجداول الإلكترونية والتوثيق وتقارير الموقع"] },
  { titleEn: "Technical foundation and languages", titleAr: "الخلفية التقنية واللغات", itemsEn: ["Bachelor of Science: Computer Science and Mathematics", "Python, JavaScript and TypeScript", "React and Next.js web development", "University-level physics and basic electrical principles", "Arabic: Native", "English: B1", "German: A1 learner"], itemsAr: ["بكالوريوس العلوم: علوم الحاسب والرياضيات", "Python وJavaScript وTypeScript", "تطوير الويب باستخدام React وNext.js", "فيزياء جامعية وأساسيات الكهرباء", "العربية: اللغة الأم", "الإنجليزية: B1", "الألمانية: متعلم A1"] }
].map((g, sortOrder) => ({ ...g, sortOrder }));
