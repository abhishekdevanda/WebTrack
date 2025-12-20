CREATE TABLE "website" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"timezone" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "website_website_id_unique" UNIQUE("website_id")
);
--> statement-breakpoint
ALTER TABLE "website" ADD CONSTRAINT "website_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;