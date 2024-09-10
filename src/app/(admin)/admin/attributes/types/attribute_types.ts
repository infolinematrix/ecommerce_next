import { uuid } from "drizzle-orm/pg-core";
import { z } from "zod";

export const attributeCreateSchema = z.object({
  name: z.string().min(1).max(180),
  identifier: z.string().min(1).max(180),
  custom_name: z.string(),
  input_type: z.string().min(1),
});

export const attributeValueCreateSchema = z.object({
  // attribute_id: z.string(),
  attribute_value: z.string().min(1).max(180),
});
