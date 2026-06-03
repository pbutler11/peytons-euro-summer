import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const guestbookEntries = pgTable('guestbook_entries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 64 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type GuestbookEntry = typeof guestbookEntries.$inferSelect;
export type NewGuestbookEntry = typeof guestbookEntries.$inferInsert;