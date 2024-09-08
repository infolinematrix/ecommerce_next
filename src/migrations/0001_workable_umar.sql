ALTER TABLE "categories" ADD COLUMN "short_description" text;--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "description";