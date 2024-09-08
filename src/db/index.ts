import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { schema } from "./schema";
import { env } from "@/env";

const client = neon(env.DATABASE_URL);
export const db = drizzle(client, { schema });

// const client = postgres(env.DATABASE_URL);
// export const db = drizzle(client, { schema });
