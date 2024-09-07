import { generateId } from "@/lib/id";

import {
  AnyPgColumn,
  foreignKey,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { lifecycleDates } from "./utils";
import { relations } from "drizzle-orm";

export const categories = pgTable(
  "categories",
  {
    id: uuid("id")
      .$defaultFn(() => generateId())
      .primaryKey(), // prefix_ + nanoid (12)
    parent_id: uuid("parent_id"),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    image: text("image"),
    icon: text("image"),
    description: text("description"),
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

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parentCategory: one(categories, {
    fields: [categories.parent_id],
    references: [categories.id],
    relationName: "subCategories",
  }),
  //...
  subCategories: many(categories, {
    relationName: "subCategories",
  }),
}));
