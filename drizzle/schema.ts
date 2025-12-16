import { pgTable, uuid, varchar, text, integer, boolean, unique, timestamp, bigint, foreignKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const userRole = pgEnum("user_role", ['user', 'admin'])


export const settings = pgTable("settings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	keyNameEn: varchar("key_name_en", { length: 255 }),
	keyNameAr: varchar("key_name_ar", { length: 255 }),
	valueEn: text("value_en"),
	valueAr: text("value_ar"),
});

export const ourTeam = pgTable("our_team", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	nameEn: varchar("name_en", { length: 255 }),
	nameAr: varchar("name_ar", { length: 255 }),
	descriptionEn: text("description_en"),
	descriptionAr: text("description_ar"),
	positionEn: varchar("position_en", { length: 255 }),
	positionAr: varchar("position_ar", { length: 255 }),
	image: varchar({ length: 255 }),
	displayOrder: integer("display_order").default(0),
	main: boolean().default(false),
});

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 225 }).notNull(),
	lastName: varchar("last_name", { length: 225 }),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	role: userRole().default('user').notNull(),
}, (table) => [
	unique("users_email_key").on(table.email),
]);

export const banners = pgTable("banners", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	alt: varchar({ length: 255 }),
	image: text(),
	descriptionEn: text("description_en"),
	descriptionAr: text("description_ar"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const careers = pgTable("careers", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 255 }),
	lastName: varchar("last_name", { length: 255 }),
	email: varchar({ length: 255 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	phoneNumber: bigint("phone_number", { mode: "number" }),
	city: varchar({ length: 255 }),
	cv: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	areaOfExpertise: varchar("area_of_expertise", { length: 255 }),
});

export const training = pgTable("training", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	nameEn: varchar("name_en", { length: 255 }).notNull(),
	nameAr: varchar("name_ar", { length: 255 }).notNull(),
	descriptionEn: text("description_en"),
	descriptionAr: text("description_ar"),
	slug: varchar({ length: 255 }),
	sortOrder: integer("sort_order"),
});

export const clients = pgTable("clients", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	logo: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const services = pgTable("services", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	nameEn: varchar("name_en", { length: 255 }).notNull(),
	nameAr: varchar("name_ar", { length: 255 }).notNull(),
	descriptionEn: text("description_en"),
	descriptionAr: text("description_ar"),
	categoryId: uuid("category_id"),
	image: varchar({ length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [consulting.id],
			name: "services_category_id_fkey"
		}),
]);

export const consulting = pgTable("consulting", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	categoryNameEn: varchar("category_name_en", { length: 255 }).notNull(),
	categoryNameAr: varchar("category_name_ar", { length: 255 }).notNull(),
	descriptionEn: text("description_en"),
	descriptionAr: text("description_ar"),
	slug: varchar({ length: 255 }),
	categoryLogo: varchar("category_logo", { length: 255 }),
	sortOrder: integer("sort_order"),
});

export const resetPasswordToken = pgTable("reset_password_token", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	token: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "reset_password_token_user_id_fkey"
		}).onDelete("cascade"),
	unique("reset_password_token_token_key").on(table.token),
]);

export const courses = pgTable("courses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	titleEn: varchar("title_en", { length: 255 }).notNull(),
	titleAr: varchar("title_ar", { length: 255 }).notNull(),
	descriptionEn: text("description_en"),
	descriptionAr: text("description_ar"),
	targetAudienceEn: text("target_audience_en").array(),
	targetAudienceAr: text("target_audience_ar").array(),
	deliveryMethodEn: text("delivery_method_en").array(),
	deliveryMethodAr: text("delivery_method_ar").array(),
	durationEn: varchar("duration_en", { length: 255 }),
	trainingId: uuid("training_id"),
	durationAr: varchar("duration_ar", { length: 255 }),
	image: text(),
}, (table) => [
	foreignKey({
			columns: [table.trainingId],
			foreignColumns: [training.id],
			name: "courses_training_id_fkey"
		}),
]);
