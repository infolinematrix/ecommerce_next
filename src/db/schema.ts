import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { demo } from "./schema/demo";
import { todos } from "./schema/todo";
import { categories } from "./schema/categpories";

export const schema = {
  ...todos,
  ...demo,
  ...categories,
};
