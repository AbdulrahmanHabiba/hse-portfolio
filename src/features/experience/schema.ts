import { z } from "zod";

const text = (max: number) => z.string().trim().min(1).max(max);
const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

export const experienceSchema = z
  .object({
    companyEn: text(160),
    companyAr: text(160),
    roleEn: text(160),
    roleAr: text(160),
    locationEn: text(120),
    locationAr: text(120),
    startDate: month,
    endDate: z.union([z.literal(""), month]),
    highlightsEn: z.string().max(6000),
    highlightsAr: z.string().max(6000),
    sortOrder: z.coerce.number().int().min(0).max(999),
  })
  .refine((v) => v.endDate === "" || v.endDate >= v.startDate, {
    path: ["endDate"],
    message: "End date must be after start date",
  });
