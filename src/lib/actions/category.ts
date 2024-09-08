import { createCategorySchema } from "@/app/(admin)/admin/categories/types/category_types";
import { db } from "@/db";
import { categories } from "@/db/schema/categpories";

export const get_parents = async () => {
  try {
    const data = await db.select().from(categories);
    return data;
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
