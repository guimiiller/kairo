import { z } from "zod";

export const createTenantSchema = z.object({
  name: z.string().trim().min(3).max(100),

  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(60)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),

  businessType: z.enum(["barbershop", "salon", "other"]),
});

export type CreateTenantInput = z.infer<typeof createTenantSchema>;
