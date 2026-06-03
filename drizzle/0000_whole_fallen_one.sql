-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key_name_en" varchar(255),
	"key_name_ar" varchar(255),
	"value_en" text,
	"value_ar" text
);
--> statement-breakpoint
CREATE TABLE "our_team" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name_en" varchar(255),
	"name_ar" varchar(255),
	"description_en" text,
	"description_ar" text,
	"position_en" varchar(255),
	"position_ar" varchar(255),
	"image" varchar(255),
	"display_order" integer DEFAULT 0,
	"main" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(225) NOT NULL,
	"last_name" varchar(225),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "banners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"alt" varchar(255),
	"image" text,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "careers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"email" varchar(255),
	"phone_number" bigint,
	"city" varchar(255),
	"cv" text,
	"created_at" timestamp DEFAULT now(),
	"area_of_expertise" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "training" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name_en" varchar(255) NOT NULL,
	"name_ar" varchar(255) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"slug" varchar(255),
	"sort_order" integer
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"logo" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name_en" varchar(255) NOT NULL,
	"name_ar" varchar(255) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"category_id" uuid,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "consulting" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_name_en" varchar(255) NOT NULL,
	"category_name_ar" varchar(255) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"slug" varchar(255),
	"category_logo" varchar(255),
	"sort_order" integer
);
--> statement-breakpoint
CREATE TABLE "reset_password_token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "reset_password_token_token_key" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title_en" varchar(255) NOT NULL,
	"title_ar" varchar(255) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"target_audience_en" text[],
	"target_audience_ar" text[],
	"delivery_method_en" text[],
	"delivery_method_ar" text[],
	"duration_en" varchar(255),
	"training_id" uuid,
	"duration_ar" varchar(255),
	"image" text
);
--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."consulting"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reset_password_token" ADD CONSTRAINT "reset_password_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "public"."training"("id") ON DELETE no action ON UPDATE no action;
*/