import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { demo } from "./schemas/demo";
import { todos } from "./schemas/todo";
import { categories } from "./schemas/categories";
import { attributes } from "./schema/attributes";

export const schema = {
  todos,
  demo,
  categories,
  attributes,
};
