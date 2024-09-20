import { db } from "@/db";
import { attribute_values } from "@/db/schema/attributes";
import {
  createAttribute,
  createAttributeReturnId,
  createValue,
} from "@/lib/actions/attributes";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const attribute = JSON.parse(formData.get("attribute")?.toString() || "");
    const values = JSON.parse(formData.get("values")?.toString() || "");

    const attribute_data = {
      name: attribute.name.toString().trim(),
      identifier: attribute.identifier.toString().trim(),
      input_type: attribute.input_type.trim(),
      custom_name: attribute.custom_name.toString().trim(),
    };
    console.log(attribute_data);

    await db.transaction(async (tx) => {
      const insertedId = await createAttributeReturnId(attribute_data);

      if (!["TEXTBOX", "TEXTAREA"].includes(attribute.input_type!)) {
        values &&
          values.map(async (i: any, ix: number) => {
            if (insertedId != false) {
              values &&
                values.map(async (item: any) => {
                  await createValue(insertedId, item);
                });
            }
          });
      }
    });

    // const insertedId = await createAttributeReturnId(attribute_data);
    // const values = formData.getAll("attribute_values[]");

    // if (insertedId != false) {
    //   values.map(async (item) => {
    //     await createValue(insertedId, item);
    //   });
    // }

    // const e = await db.query.attribute_values.findFirst({

    //   where: eq(
    //     attribute_values.attribute_id,
    //     "b9615ac4-676d-46c4-930f-0a70b7ba0f12"
    //   ),
    // });

    // console.log("---------------------", e?.attribute_id);

    return NextResponse.json({});
  } catch (error) {
    console.log("API Error: ", error);
    return false;
  }
}
