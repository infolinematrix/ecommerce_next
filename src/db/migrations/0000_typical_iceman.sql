DO $$ BEGIN
 CREATE TYPE "public"."attribute_type" AS ENUM('TEXT', 'TEXTBOX', 'SELECT', 'SELECT-MULTIPLE', 'OPTIONS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attributes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"identifier" text NOT NULL,
	"custom_name" text,
	"input_type" "attribute_type" DEFAULT 'TEXT' NOT NULL,
	"status" integer DEFAULT 51,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp,
	CONSTRAINT "attributes_name_unique" UNIQUE("name"),
	CONSTRAINT "attributes_identifier_unique" UNIQUE("identifier")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid,
	"name" text NOT NULL,
	"identifier" text NOT NULL,
	"has_child" boolean DEFAULT true,
	"active" boolean DEFAULT true,
	"short_description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp,
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_identifier_unique" UNIQUE("identifier")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "fkey_parent_id" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
