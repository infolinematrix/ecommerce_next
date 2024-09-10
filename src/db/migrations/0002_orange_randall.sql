ALTER TYPE "attribute_type" ADD VALUE 'TEXTAREA';--> statement-breakpoint
ALTER TABLE "attributes" ALTER COLUMN "input_type" SET DEFAULT 'TEXTBOX';