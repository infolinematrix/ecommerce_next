import { CategoryType } from "@/db/schemas/categories";
import { create_category } from "@/lib/actions/category";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const data = <CategoryType>{
      name: formData.get("name")?.toString().trim(),
      parent_id:
        formData.get("parent_id") === "" ? null : formData.get("parent_id"),
      identifier: formData.get("identifier")?.toString().trim(),
      has_child: formData.get("has_child") === "true" ? true : false,
      active: formData.get("active"),
      short_description: formData.get("short_description")?.toString().trim(),
    };

    // console.log(data);

    const res = await create_category(data);
    return NextResponse.json({});
  } catch (error) {
    console.log("API Error: ", error);
  }
}
