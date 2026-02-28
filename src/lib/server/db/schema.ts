import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth.schema';

export * from './auth.schema';

export const post = pgTable('posts', {
	id: uuid().defaultRandom().primaryKey(),
	title: text().notNull(),
	slug: text().notNull(),
	body: text().notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	authorId: text('author_id')
		.references(() => user.id, { onDelete: 'cascade' })
		.notNull()
});
