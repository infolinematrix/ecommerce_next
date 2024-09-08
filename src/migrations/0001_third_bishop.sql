ALTER TABLE "categories" DROP CONSTRAINT "categories_identifier_unique";--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "fkey_parent_id";
--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "parent_id";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "identifier";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "has_child";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "active";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "updated_at";