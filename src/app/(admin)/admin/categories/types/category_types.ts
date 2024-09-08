import { z } from "zod";

const booleanString = z
  .string()
  .refine((value) => value === "true" || value === "false", {
    message: "Value must be a boolean",
  })
  .transform((value) => value === "true");

export const createCategorySchema = z.object({
  parent_id: z.string(),
  name: z.string().min(1).max(180),
  identifier: z.string().min(1).max(180),
  short_description: z.string().min(3).max(255),
  has_child: z.string(),
  active: z.boolean(),
});
