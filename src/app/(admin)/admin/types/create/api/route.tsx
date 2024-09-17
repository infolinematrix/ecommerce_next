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

    const fType = formData.get("type") || "";
    const fAttributes = formData.get("attributes") || "";
    const typ = JSON.parse(fType.toString());
    const atr = JSON.parse(fAttributes.toString());

    console.log("===========VALUES====", typ.name);
    const result = await create_type(typ, atr);

    return NextResponse.json(result);
  } catch (error) {
    console.log("API ERROR : ", error);
    return NextResponse.json({ error });
  }
}
