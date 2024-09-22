import { categoryDeleteById } from "@/lib/actions/category";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id")?.toString();
    const res = await categoryDeleteById(id!);

    return NextResponse.json({ success: res });
  } catch (error) {
    console.log("API Error: ", error);
    return NextResponse.json({ success: false });
  }
}
