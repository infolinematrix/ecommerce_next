import { categoryUpdateById, create_category } from "@/lib/actions/category";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id")?.toString().trim();

    const data = {
      id: formData.get("id")?.toString().trim(),
      name: formData.get("name")?.toString().trim(),
      identifier: formData.get("identifier")?.toString().trim(),
      short_description: formData.get("short_description")?.toString().trim(),
      active: formData.get("active"),
    };

    console.log(data);
    const res = await categoryUpdateById(id!, data!);

    if (!res) console.log("ERROR---------------------");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("API Error: ", error);
    return NextResponse.json({ success: false });
  }
}
