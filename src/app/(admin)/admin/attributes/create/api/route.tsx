import { createAttribute } from "@/lib/actions/attributes";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const data = {
      name: formData.get("name")?.toString().trim(),
      identifier: formData.get("identifier")?.toString().trim(),
      input_type: formData.get("input_type")?.toString().trim(),
      custom_name: formData.get("custom_name")?.toString().trim(),
    };
    console.log(data);

    const res = await createAttribute(data);

    return NextResponse.json(res);
  } catch (error) {
    console.log("API Error: ", error);
    return false;
  }
}
