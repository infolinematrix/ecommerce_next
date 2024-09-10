import { uuid } from "drizzle-orm/pg-core";
import { z } from "zod";

export const AttributeCreateSchema = z.object({
  name: z.string().min(1).max(180),
  identifier: z.string().min(1).max(180),
  custom_name: z.string(),
  input_type: z.string().min(1),
});

export const AttributeValueCreateSchema = z.object({
  attribute_value: z.string().min(1).max(180),
});
