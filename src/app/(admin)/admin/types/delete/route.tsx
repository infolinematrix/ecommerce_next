import { db } from "@/db";
import { remove_type } from "@/lib/actions/types";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id")?.toString();
    await remove_type(id!);

    return NextResponse.json(true);
  } catch (error) {
    console.log("ACTION ", error);
  }
}
