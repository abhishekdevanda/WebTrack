CREATE TABLE "page_view" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"visitor_id" text NOT NULL,
	"entry_time" timestamp,
	"exit_time" timestamp,
	"total_active_time" integer DEFAULT 0,
	"referrer" text,
	"url" text,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"ref_params" text,
	"device" text,
	"os" text,
	"browser" text,
	"city" text,
	"country" text,
	"region" text,
	"ip_address" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "page_view" ADD CONSTRAINT "page_view_website_id_website_website_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."website"("website_id") ON DELETE cascade ON UPDATE no action;