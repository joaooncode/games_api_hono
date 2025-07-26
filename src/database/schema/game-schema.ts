import { boolean, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const gameTable = pgTable("games", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  genre: varchar("genre", { length: 100 }).notNull(),
  releaseYear: integer("release_year").notNull(),
  developer: varchar("developer", { length: 100 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  isAvailable: boolean("is_available").notNull(),
});
