"use server";

import { db } from "@/db";
import { type_properties, types } from "@/db/schema/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const get_types = async () => {
  try {
    const data = await db.select().from(types);
    return data;
  } catch (error) {
    console.log("Action Error: ", error);
  }
};

export const get_type = async (id: string) => {
  try {
    const data = await db.query.types.findFirst({
      where: eq(types.id, id),
      with: { type_properties: true },
    });
    return data;
  } catch (error) {
    console.log("Action Error: ", error);
  }
};

export const remove_type = async (id: string) => {
  try {
    console.log("Deleting ... ", id);

    await db.delete(types).where(eq(types.id, id));
    revalidatePath("get_types");

    return true;
  } catch (error) {
    console.log("Action Error: ", error);
  }
};

export const create_type = async (typ: any, atr: any) => {
  try {
    await db.transaction(async (tx) => {
      const type_data = {
        name: typ.name,
        identifier: typ.identifier,
      };
      const result = await tx.insert(types).values(type_data).returning();

      atr?.map(async (a: any) => {
        console.log("===========VALUES====", result[0].id);

        const attData = {
          type_id: result[0].id,
          attribute_id: a.attribute_id.toString().trim() || "",
          filterable: a.filterable || false,
          price_varient: a.price_varient || false,
          required: a.required || false,
        };
        console.log("---------------", attData);
        await tx.insert(type_properties).values(attData);
        return true;
      });
    });
  } catch (error) {
    console.log("ACTION ERRR");
  }
};

export const updateTypeById = async (id: string, formData: any) => {
  try {
    await db.transaction(async (tx) => {
      const type_data = {
        name: formData.type.name,
        identifier: formData.type.identifier,
      };

      console.log("-------------------", type_data);
      await db.update(types).set(type_data).where(eq(types.id, id));
      return true;
    });
  } catch (error) {
    console.log(error);
  }
};
