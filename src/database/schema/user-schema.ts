import { boolean, date, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("name", { length: 100 }).notNull(),
  password: varchar("password").notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
  updatedAt: date("updated_at").notNull().defaultNow(),
  isAdmin: boolean("is_admin").notNull().default(false),
});
