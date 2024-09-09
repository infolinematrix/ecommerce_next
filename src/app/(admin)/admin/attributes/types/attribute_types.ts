import { z } from "zod";

export const attributeCreateSchema = z.object({
  name: z.string().min(1).max(180),
  identifier: z.string().min(1).max(180),
  custom_name: z.string().min(1).max(180),
  input_type: z.string().min(1).max(50),
});
