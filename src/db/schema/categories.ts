// import { generateId } from "@/lib/id";

import { relations } from "drizzle-orm";
import { boolean, foreignKey, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { lifecycleDates } from "../utils";

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    // id: text("id")
    //   .$defaultFn(() => generateId())
    //   .primaryKey()
    //   .notNull(),

    parent_id: uuid("parent_id"),
    name: text("name").notNull().unique(),
    identifier: text("identifier").notNull().unique(),
    has_child: boolean("has_child").default(true),
    active: boolean("active").default(true),
    content_type: text("content_type"),
    short_description: text("short_description"),

    ...lifecycleDates,
  },
  (table) => ({
    parentReference: foreignKey({
      columns: [table.parent_id],
      foreignColumns: [table.id],
      name: "fkey_parent_id",
    }).onDelete("cascade"),
  })
);

// export const categoriesRelations = relations(categories, ({ one, many }) => ({
//   parentCategory: one(categories, {
//     fields: [categories.parent_id],
//     references: [categories.id],
//     relationName: "subCategories",
//   }),
//   //...
//   subCategories: many(categories, {
//     relationName: "subCategories",
//   }),
// }));

export type CategoryType = typeof categories.$inferSelect;
