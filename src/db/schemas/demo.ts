import { sql } from "drizzle-orm";
import {
  bigint,
  index,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const demo = pgTable(
  "todos",
  {
    id: serial("id").notNull().primaryKey(),
    text: text("text").notNull(),
    description: text("text"),
  },
  (table) => ({})
);

export type DemoTypes = typeof demo.$inferSelect;
