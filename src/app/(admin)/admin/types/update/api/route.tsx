import { updateTypeById } from "@/lib/actions/types";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();

    const type_id = JSON.parse(formData.get("type_id")?.toString() || "");
    const type = JSON.parse(formData.get("type")?.toString() || "");
    const properties = JSON.parse(formData.get("properties")?.toString() || "");

    const result = await updateTypeById(type_id, { type, properties });
    // console.log("--ROUTE---", result);

    return NextResponse.json(true);
  } catch (error) {
    console.log("ROUTE ERROR..", error);
  }
}
