import { z } from "zod";

const text = (max: number) => z.string().trim().min(1).max(max);
const optionalText = (max: number) => z.string().trim().max(max);
const optionalUrl = z.union([z.literal(""), z.url().max(300)]);

export const profileSchema = z.object({
  nameEn: text(120),
  nameAr: text(120),
  titleEn: text(160),
  titleAr: text(160),
  taglineEn: text(240),
  taglineAr: text(240),
  summaryEn: text(1500),
  summaryAr: text(1500),
  locationEn: text(120),
  locationAr: text(120),
  relocationEn: optionalText(160),
  relocationAr: optionalText(160),
  email: z.email().max(200),
  phone: text(40),
  linkedin: optionalUrl,
  cvUrl: optionalUrl,
});
