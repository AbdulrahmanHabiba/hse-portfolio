import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  body: z.string().trim().min(10).max(3000),
  // Honeypot: real people never see or fill this field; bots usually do.
  website: z.string().max(0).optional(),
});
