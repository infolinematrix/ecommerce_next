import { create_category } from "@/lib/actions/category";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const data = {
      name: formData.get("name"),
      parent_id: formData.get("parent_id"),
      identifier: formData.get("identifier"),
      has_child: formData.get("has_child") === "true" ? true : false,
      active: formData.get("active"),
    };

    console.log(data);

    const res = await create_category(data);
    return NextResponse.json({});
  } catch (error) {
    console.log("API Error: ", error);
  }
}
