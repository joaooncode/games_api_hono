import type { Context } from "hono";

import type { NewOrder } from "../interfaces/new-order";

import { orderRequestSchema, orderZodSchema } from "../database/schema/order-validation-schema";
import { findAllOrders, findOrderById, newOrder } from "../services/orders-service";

// GET all orders
export async function getAllOrders(c: Context) {
  const order = await findAllOrders();
  return c.json(order);
}

// GET order by ID
export async function getOrderById(c: Context) {
  const id = c.req.param("id");
  const order = await findOrderById(Number(id));
  if (!order) {
    return c.notFound();
  }
  return c.json(order);
}

// POST new order
export async function createOrder(c: Context) {
  const orderData = await c.req.json();
  const parsedOrder = orderRequestSchema.safeParse(orderData);

  if (!parsedOrder.success) {
    return c.json({ error: parsedOrder.error }, 400);
  }
  const newOrderData = await newOrder(parsedOrder.data as NewOrder, c);
  if (newOrderData instanceof Response) {
    return newOrderData; // Return the response directly if it's an error
  }
  return c.json(newOrderData, 201);
}
