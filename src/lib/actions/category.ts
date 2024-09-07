import { categories } from "./../../db/schema/categpories";
import { db } from "@/db";

const _tableName = "categories";

export const get_parents = async () => {
  try {
    const data = await db.select().from(categories);
    return data;
  } catch (error) {
    console.log("Action Error: ", error);
  }
};
