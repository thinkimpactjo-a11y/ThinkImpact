import { relations } from "drizzle-orm/relations";
import { consulting, services, users, resetPasswordToken, training, courses } from "./schema";

export const servicesRelations = relations(services, ({one}) => ({
	consulting: one(consulting, {
		fields: [services.categoryId],
		references: [consulting.id]
	}),
}));

export const consultingRelations = relations(consulting, ({many}) => ({
	services: many(services),
}));

export const resetPasswordTokenRelations = relations(resetPasswordToken, ({one}) => ({
	user: one(users, {
		fields: [resetPasswordToken.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	resetPasswordTokens: many(resetPasswordToken),
}));

export const coursesRelations = relations(courses, ({one}) => ({
	training: one(training, {
		fields: [courses.trainingId],
		references: [training.id]
	}),
}));

export const trainingRelations = relations(training, ({many}) => ({
	courses: many(courses),
}));