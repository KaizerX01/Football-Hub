import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  favoriteTeam : text('favoriteTeam'),
  favoriteCountry: text('favoriteCountry'),
  name: text('name').notNull(),
  avatar_url:text('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const contactEmails = pgTable('contactEmails',{
  email:text('email').notNull().unique().primaryKey(),
})

export const teams = pgTable('teams',{
  id:text('id').primaryKey(),
  name:text('name').notNull(),
})