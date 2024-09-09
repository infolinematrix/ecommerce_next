import { createCategorySchema } from "@/app/(admin)/admin/categories/types/category_types";
import { db } from "@/db";
import { CategoryType } from "@/db/schema/categpories";
import { categories } from "@/db/schemas/categories";

import { eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const get_parents = async (parent: string | undefined) => {
  try {
    if (parent == undefined) {
      const data = await db
        .select()
        .from(categories)
        .where(isNull(categories.parent_id));
      return <CategoryType>data;
    }
    const data = await db
      .select()
      .from(categories)
      .where(eq(categories.parent_id, parent));
    return <CategoryType>data;
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

    return <CategoryType>data[0];
  } catch (error) {
    console.log("Action Error: ", error);
  }
};

export const create_category = async (data: any) => {
  try {
    // console.log("-------------", data);

    await db.insert(categories).values(data);
    revalidatePath("");
    return true;
  } catch (error) {
    console.log("Action Error: ", error);
    return error;
  }
};

export const categoryDeleteById = async (id: string) => {
  try {
    await db.delete(categories).where(eq(categories.id, id));
  } catch (error) {
    console.log("Action Error: ", error);
    return false;
  }
  return true;
};

export const categoryUpdateById = async (id: string, data: any) => {
  try {
    console.log(id);

    await db.update(categories).set(data).where(eq(categories.id, id));
  } catch (error) {
    console.log("Action Error: ", error);
    return false;
  }

  return true;
};
