import { db } from "@/db";
import {
  type_properties,
  TypePropertiesType,
  types,
  TypesType,
} from "@/db/schema/types";
import { create_type } from "@/lib/actions/types";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const type = JSON.parse(formData.get("type")?.toString() || "");
    const properties = JSON.parse(formData.get("properties")?.toString() || "");

    console.log("===========Inserting====");
    const result = await create_type({ type, properties });

    return NextResponse.json(result);
  } catch (error) {
    console.log("API ERROR : ", error);
    return NextResponse.json({ error });
  }
}
