import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { gameTable } from "./game-schema";
import { users } from "./user-schema";

export const orderTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  gameId: integer("game_id").notNull().references(() => gameTable.id),
  orderDate: date("order_date").notNull(),
  orderQuantity: integer("order_quantity").notNull(),
  orderStatus: varchar("order_status", { length: 20 }).notNull(),
  orderReturnDate: date("order_return_date"),
});
