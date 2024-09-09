import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
<<<<<<< HEAD
  schema: "./src/db/schema",
=======
  // schema: "./src/db/schema/",
  schema: "./src/db/schema/*",
>>>>>>> b1d7eb0b9f5ec3f15a1dbc769718856356d01282
  out: "./src/db/migrations",
  dialect: "postgresql",

  dbCredentials: {
    url: env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
