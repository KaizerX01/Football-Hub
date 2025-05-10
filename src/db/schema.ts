// db/schema.ts
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";



export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  avatar_url: text("avatar_url"),
  Country: text("Country"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const teams = pgTable("teams", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

// 🔥 New favoriteTeams join table
export const favoriteTeams = pgTable("favorite_teams", {
  id: uuid("id").defaultRandom().primaryKey(), // system-generated PK
  userId: uuid("user_id").references(() => users.id).notNull(),
  teamId: text("team_id").references(() => teams.id).notNull(),
});