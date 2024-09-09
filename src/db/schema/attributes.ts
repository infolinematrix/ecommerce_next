import {
  pgEnum,
  pgTable,
  uuid,
  text,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { lifecycleDates } from "../utils";

export const inputEnum = pgEnum("attribute_type", [
  "TEXT",
  "TEXTBOX",
  "SELECT",
  "SELECT-MULTIPLE",
  "OPTIONS",
]);

export const attributes = pgTable("attributes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  identifier: text("identifier").notNull().unique(),
  custom_name: text("custom_name"),
  input_type: inputEnum("input_type").notNull().default("TEXT"),
  status: integer("status").default(51),
  ...lifecycleDates,
});

export type AttributeType = typeof attributes.$inferSelect;
