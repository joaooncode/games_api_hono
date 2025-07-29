import { Hono } from "hono";

import { createOrder, getAllOrders, getOrderById } from "../controllers/order-controller";
import { adminAuth, basicAuth } from "../middlewares/basic-auth";

const ordersRouter = new Hono();

// Get all orders
ordersRouter.get("/", basicAuth, adminAuth, getAllOrders);

// Get order by ID
ordersRouter.get("/:id", basicAuth, getOrderById);

// Create a new order
ordersRouter.post("/", basicAuth, createOrder);

export { ordersRouter };
