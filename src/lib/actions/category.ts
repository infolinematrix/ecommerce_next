import { createCategorySchema } from "@/app/(admin)/admin/categories/types/category_types";
import { db } from "@/db";
import { categories } from "@/db/schemas/categories";

import { eq, isNull } from "drizzle-orm";

export const get_parents = async (parent: string | undefined) => {
  try {
    if (parent == undefined) {
      const data = await db
        .select()
        .from(categories)
        .where(isNull(categories.parent_id));
      return data;
    }
    const data = await db
      .select()
      .from(categories)
      .where(eq(categories.parent_id, parent));
    return data;
  } catch (error) {
    console.log("Action Error: ", error);
  }
};

export const categoryById = async (id: string) => {
  try {
    const data = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    return data[0];
  } catch (error) {
    console.log("Action Error: ", error);
  }
};

export const create_category = async (data: any) => {
  try {
    // console.log("-------------", data);

    await db.insert(categories).values(data);
    return true;
  } catch (error) {
    console.log("Action Error: ", error);
    return error;
  }
};
