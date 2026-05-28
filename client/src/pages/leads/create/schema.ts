import z from "zod";

export const LeadsSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10).max(16),
  source: z.enum(["Call", "WhatsApp", "Field"]),
  status: z.enum([
    "Not Contacted",
    "Interested",
    "Not Interested",
    "Converted",
  ]),
});

export type LeadsType = z.infer<typeof LeadsSchema>;
