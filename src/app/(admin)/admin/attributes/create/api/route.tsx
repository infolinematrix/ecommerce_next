import {
  createAttribute,
  createAttributeReturnId,
  createValue,
} from "@/lib/actions/attributes";
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
    values.map(async (item) => {
      const data = {
        attribute_id: insertedId,
        attribute_value: item,
      };

      await createValue(data);
    });

    console.log("---------------------", values);

    return NextResponse.json({});
  } catch (error) {
    console.log("API Error: ", error);
    return false;
  }
}