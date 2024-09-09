import { db } from "@/db";
import { attributes } from "@/db/schema/attributes";
import { eq } from "drizzle-orm";
import { serial } from "drizzle-orm/pg-core";
export const getAttributes = async () => {
  try {
    const data = db.select().from(attributes).where(eq(attributes.status, 51));
    return data;
  } catch (error) {
    console.log("Action Error", error);
    return false;
  }

  return true;
};
