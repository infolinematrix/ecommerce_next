import {
  createValue,
  deleteValesByAttributeId,
  updateAttributeById,
} from "@/lib/actions/attributes";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const attribute_data = {
      name: formData.get("attribute[name]")?.toString().trim(),
      identifier: formData.get("attribute[identifier]")?.toString().trim(),
      input_type: formData.get("attribute[input_type]")?.toString().trim(),
      custom_name: formData.get("attribute[custom_name]")?.toString().trim(),
    };

    //--save attribute
    const id = formData.get("id")?.toString().trim();
    await updateAttributeById(id!, attribute_data);

    // //--save values

    if (["TEXTBOX", "TEXTAREA"].includes(attribute_data.input_type!)) {
      await deleteValesByAttributeId(id!);
    } else {
      const values = formData.getAll("attribute_values[]");
      // console.log("=============", values);

      await deleteValesByAttributeId(id!);
      values.map(async (i: any, ix: number) => {
        await createValue(id!, i);
      });
    }

    return NextResponse.json(request.body);
  } catch (error) {
    console.log("ROUTE ERROR: ", error);
    return NextResponse.json({ error });
  }
}
