import { pgTable, serial, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';

export const guestbookEntries = pgTable('guestbook_entries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 64 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type GuestbookEntry = typeof guestbookEntries.$inferSelect;
export type NewGuestbookEntry = typeof guestbookEntries.$inferInsert;

// Sitewide counter. Single row, updated on every visit.
export const siteCounters = pgTable('site_counters', {
  key: varchar('key', { length: 64 }).primaryKey(),
  count: integer('count').notNull().default(0),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type SiteCounter = typeof siteCounters.$inferSelect;