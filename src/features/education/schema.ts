import { z } from "zod";

const text = (max: number) => z.string().trim().min(1).max(max);

export const educationSchema = z.object({
  institutionEn: text(200),
  institutionAr: text(200),
  degreeEn: text(200),
  degreeAr: text(200),
  noteEn: z.string().trim().max(300),
  noteAr: z.string().trim().max(300),
  graduationYear: z.coerce.number().int().min(1980).max(2100),
  sortOrder: z.coerce.number().int().min(0).max(999),
});
