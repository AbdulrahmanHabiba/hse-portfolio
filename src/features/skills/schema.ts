import { z } from "zod";
import { splitLines } from "@/lib/utils";

const text = (max: number) => z.string().trim().min(1).max(max);

export const skillGroupSchema = z
  .object({
    titleEn: text(120),
    titleAr: text(120),
    itemsEn: z.string().max(4000),
    itemsAr: z.string().max(4000),
    sortOrder: z.coerce.number().int().min(0).max(999),
  })
  .refine((v) => splitLines(v.itemsEn).length > 0, { path: ["itemsEn"], message: "required" })
  // itemsEn[i] and itemsAr[i] must be the same skill, so the counts have to match.
  .refine((v) => splitLines(v.itemsEn).length === splitLines(v.itemsAr).length, {
    path: ["itemsAr"],
    message: "counts must match",
  });
