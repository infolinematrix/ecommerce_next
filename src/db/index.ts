import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schema";
import { env } from "@/env";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });
