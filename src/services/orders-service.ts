import type { Context } from "hono";

import { eq } from "drizzle-orm";

import type { NewOrder } from "../interfaces/new-order";
// import type { Order } from "../interfaces/order";

import { db } from "../database/db";
import { gameTable } from "../database/schema/game-schema";
import { orderTable } from "../database/schema/order-schema";
import { orderRequestSchema } from "../database/schema/order-validation-schema";
import { OrderStatus } from "../enums/order-status";
import { getReturnDays } from "../utils/return-date";

export async function findAllOrders() {
  return db.select().from(orderTable).orderBy(orderTable.id);
}
export async function findOrderById(id: number) {
  const order = await db.select().from(orderTable).where(eq(orderTable.id, id));
  if (order.length === 0) {
    return null;
  }
  return order[0];
}

export async function newOrder(order: NewOrder, c: Context) {
  const validation = orderRequestSchema.safeParse(order);

  if (!validation.success) {
    return c.json({ error: validation.error }, 400);
  }

  const user = c.get("user");

  const { gameId, orderQuantity } = order;
  const orderDate = new Date();

  const game = await db.select().from(gameTable).where(eq(gameTable.id, gameId));

  if (!game || game.length === 0) {
    return c.notFound();
  }

  if (!game[0]?.isAvailable) {
    return c.text("Game is not available for order", 400);
  }

  const category = game[0]?.category;
  if (!category) {
    return c.text("Game category not found", 400);
  }
  const returnDays = getReturnDays(category);

  const orderReturnDate = new Date(orderDate);
  orderReturnDate.setDate(orderReturnDate.getDate() + returnDays);

  const [newOrder] = await db.insert(orderTable).values({
    userId: user.id,
    gameId,
    orderDate: orderDate.toISOString(),
    orderQuantity,
    orderStatus: OrderStatus.ACTIVE,
    orderReturnDate: orderReturnDate.toISOString(),
  }).returning();

  await db.update(gameTable)
    .set({ isAvailable: false })
    .where(eq(gameTable.id, gameId));

  return newOrder;
}
