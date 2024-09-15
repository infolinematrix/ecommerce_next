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

    const attribute_data = {
      name: formData.get("attribute[name]")?.toString().trim(),
      identifier: formData.get("attribute[identifier]")?.toString().trim(),
      input_type: formData.get("attribute[input_type]")?.toString().trim(),
      custom_name: formData.get("attribute[custom_name]")?.toString().trim(),
    };

    const insertedId = await createAttributeReturnId(attribute_data);
    const values = formData.getAll("attribute_values[]");

    if (insertedId != false) {
      values.map(async (item) => {
        await createValue(insertedId, item);
      });
    }

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
