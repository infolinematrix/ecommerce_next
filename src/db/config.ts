import { schema } from "./schema";
import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/",
  out: "./src/migrations",
  dialect: "postgresql",

  dbCredentials: {
    url: env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
