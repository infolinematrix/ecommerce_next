import { sql } from "drizzle-orm";
import {
  bigint,
  index,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const todos = pgTable(
  "todos",
  {
    id: serial("id").notNull().primaryKey(),
    text: text("text").notNull(),
    description: text("text"),

    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
  },
  (table) => ({})
);

export type TodoTypes = typeof todos.$inferSelect;
