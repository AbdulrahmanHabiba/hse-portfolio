import { z } from "zod";

const text = (max: number) => z.string().trim().min(1).max(max);

export const certificationSchema = z.object({
  nameEn: text(200),
  nameAr: text(200),
  issuerEn: text(200),
  issuerAr: text(200),
  // Empty string means "no year shown".
  year: z.union([z.literal(""), z.coerce.number().int().min(1990).max(2100)]),
  credentialUrl: z.union([z.literal(""), z.url().max(300)]),
  sortOrder: z.coerce.number().int().min(0).max(999),
});
