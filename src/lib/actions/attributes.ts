import { db } from "@/db";
import { attributes } from "@/db/schema/attributes";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getAttributes = async () => {
  try {
    const data = await db
      .select()
      .from(attributes)
      .where(eq(attributes.status, 51));
    return data;
  } catch (error) {
    console.log("Action Error", error);
    return null;
  }
};

export const getAttributeById = async (id: string) => {
  try {
    const data = await db
      .select()
      .from(attributes)
      .where(eq(attributes.id, id));
    return data;
  } catch (error) {
    console.log("Action Error", error);
    return null;
  }
};
export const updateAttributeById = async (id: string, data: any) => {
  try {
    await db.update(attributes).set(data).where(eq(attributes.id, id));
  } catch (error) {
    console.log("Action Error", error);
    return null;
  }
};
export const deleteAttributeById = async (id: string) => {
  try {
    await db.delete(attributes).where(eq(attributes.id, id));
  } catch (error) {
    console.log("Action Error", error);
    return null;
  }
};
export const createAttribute = async (data: any) => {
  try {
    await db.insert(attributes).values(data);
    revalidatePath("getAttributes");
    return true;
  } catch (error) {
    console.log("Action Error", error);
    return null;
  }
};

export const getValues = async () => {
  try {
  } catch (error) {
    console.log("Action Error", error);
    return null;
  }
};
export const createValue = async () => {
  try {
  } catch (error) {
    console.log("Action Error", error);
    return null;
  }
};
export const deleteValue = async (id: string) => {
  try {
  } catch (error) {
    console.log("Action Error", error);
    return null;
  }
};
