import { any, boolean, z } from "zod";

export const TypesSchema = z.object({
  name: z.string().min(1).max(180),
  identifier: z.string().min(1).max(180),
});

export const TypePropertiesSchema = z.object({
  attribute_id: z.string().min(1).max(36),
  attribute_name: z.string().optional(),
  filterable: z.boolean(),
  price_varient: z.boolean(),
  required: z.boolean(),
});
