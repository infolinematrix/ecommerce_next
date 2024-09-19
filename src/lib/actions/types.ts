"use server";

import { db } from "@/db";
import { type_properties, types } from "@/db/schema/types";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { exit } from "process";

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

export const create_type = async (formData: any) => {
  try {
    await db.transaction(async (tx) => {
      const type_data = {
        name: formData.type.name,
        identifier: formData.type.identifier,
      };
      const result = await tx.insert(types).values(type_data).returning();

      formData.properties?.map(async (a: any) => {
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
    await db.transaction(
      async (tx) => {
        const type_data = {
          name: formData.type.name,
          identifier: formData.type.identifier,
        };

        // console.log("-------------------", type_data);
        await db.update(types).set(type_data).where(eq(types.id, id));

        console.log("-------deleting properties--------");
        await tx
          .delete(type_properties)
          .where(and(eq(type_properties.type_id, id)));

        formData.properties?.map(async (p: any) => {
          const propsData = {
            type_id: id,
            attribute_id: p.attribute_id.toString().trim() || "",
            filterable: p.filterable || false,
            price_varient: p.price_varient || false,
            required: p.required || false,
          };

          console.log("-----Adding-----");
          await tx.insert(type_properties).values(propsData);
        });

        return true;
      },
      {
        isolationLevel: "read committed",
        accessMode: "read write",
        deferrable: true,
      }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};
