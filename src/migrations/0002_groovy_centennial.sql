ALTER TABLE "categories" ADD COLUMN "parent_id" uuid;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "identifier" text NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "has_child" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "updated_at" timestamp DEFAULT current_timestamp;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_identifier_unique" UNIQUE("identifier");