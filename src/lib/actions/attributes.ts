"use server";

import { db } from "@/db";
import {
  attribute_values,
  attributes,
  AttributeType,
} from "@/db/schema/attributes";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { exit } from "process";

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
    const data = await db.query.attributes.findFirst({
      with: {
        attribute_values: true,
      },
      where: eq(attributes.id, id),
    });

    return data;
  } catch (error) {
    console.log("Action Error", error);
    return null;
  }
};
export const updateAttributeById = async (id: string, data: any) => {
  try {
    await db.update(attributes).set(data).where(eq(attributes.id, id));

    // revalidatePath("/admin/attributes");
    // revalidatePath("/admin/attributes", "layout");
  } catch (error) {
    console.log("Action Error", error);
  }
};
export const deleteAttributeById = async (id: string) => {
  try {
    await db.delete(attributes).where(eq(attributes.id, id));
    revalidatePath("getAttributes");
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

export const deleteValesByAttributeId = async (id: string) => {
  await db
    .delete(attribute_values)
    .where(eq(attribute_values.attribute_id, id));
};

export const createValue = async (attribute_id: string, value: any) => {
  try {
    const exist = await db.query.attribute_values.findFirst({
      where: and(
        eq(attribute_values.attribute_id, attribute_id),
        eq(attribute_values.attribute_value, value)
      ),
    });

    // console.log(value, "======Exist==================", value);
    await db.insert(attribute_values).values({
      attribute_id: attribute_id,
      attribute_value: value,
    });
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

export const createAttributeReturnId = async (data: any) => {
  try {
    const id = await db
      .insert(attributes)
      .values(data)
      .returning({ insertedId: attributes.id });

    return id[0].insertedId;
  } catch (error) {
    console.log("Action Error", error);
    return false;
  }
};
