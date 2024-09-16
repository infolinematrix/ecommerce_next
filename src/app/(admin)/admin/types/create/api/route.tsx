import { db } from "@/db";
import {
  type_properties,
  TypePropertiesType,
  types,
  TypesType,
} from "@/db/schema/types";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fType = formData.get("type") || "";
    const fAttributes = formData.get("attributes") || "";
    const typ = JSON.parse(fType.toString());
    const atr = JSON.parse(fAttributes.toString());

    console.log(atr[0].attribute_id);

    await db.transaction(async (tx) => {
      //   const type_data = {
      //     name: formData.get("type[name]")?.toString().trim() || "",
      //     identifier: formData.get("type[identifier]")?.toString().trim() || "",
      //   };
      // const result = await tx.insert(types).values(type_data).returning();
      //   console.log("==================", atrList);
      // atrList?.map(async (a: any) => {
      //   // a = { ...a, type_id: result[0].id };
      //   const attData = {
      //     type_id: result[0].id,
      //     attribute_id: a.attribute_id.toString().trim() || "",
      //     filterable: a.toString().filterable.trim() || "",
      //     price_varient: a.toString().price_varient.trim() || "",
      //     required: a.toString().required.trim() || "",
      //   };
      //   console.log("---------------", attData);
      //   //   await tx.insert(type_properties).values(attData);
      // });
    });

    // await db.transaction(async (tx) => {
    //   const result = await tx
    //     .insert(types)
    //     .values(post_data.)
    //     .returning({ userId: users.id });

    //   await tx
    //     .insert(tokens)
    //     .values({ userId: result[0].userId, token: "123" });
    // });

    return NextResponse.json(request);
  } catch (error) {
    console.log("API ERROR : ", error);
    return NextResponse.json({ error });
  }
}
