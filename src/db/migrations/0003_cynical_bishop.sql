CREATE TABLE IF NOT EXISTS "type_properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type_id" uuid NOT NULL,
	"attribute_id" uuid NOT NULL,
	"filterable" boolean DEFAULT false,
	"price_varient" boolean DEFAULT false,
	"required" boolean DEFAULT false,
	"status" integer DEFAULT 51,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"identifier" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp,
	CONSTRAINT "types_name_unique" UNIQUE("name"),
	CONSTRAINT "types_identifier_unique" UNIQUE("identifier")
);
--> statement-breakpoint
ALTER TABLE "attribute_values" DROP CONSTRAINT "fkey_attribute";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "type_properties" ADD CONSTRAINT "type_properties_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "type_properties" ADD CONSTRAINT "type_properties_attribute_id_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "typePropertiesIdx" ON "type_properties" USING btree ("filterable","price_varient","required");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "typeIdentifierIdx" ON "types" USING btree ("identifier");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attribute_values" ADD CONSTRAINT "attribute_values_attribute_id_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "attribute_value_idx" ON "attribute_values" USING btree ("attribute_id","attribute_value");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "identifier_idx" ON "attributes" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "input_type_idx" ON "attributes" USING btree ("input_type");--> statement-breakpoint
ALTER TABLE "attribute_values" ADD CONSTRAINT "value_unique_index" UNIQUE("attribute_id","attribute_value");