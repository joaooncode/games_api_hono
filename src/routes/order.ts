import { Hono } from "hono";

import { createOrder, getAllOrders, getOrderById } from "../controllers/order-controller";
import { adminAuth, jwtAuth } from "../middlewares/jwt-auth";

const ordersRouter = new Hono();

// Get all orders
ordersRouter.get("/", jwtAuth, adminAuth, getAllOrders);

// Get order by ID
ordersRouter.get("/:id", jwtAuth, getOrderById);

// Create a new order
ordersRouter.post("/", jwtAuth, createOrder);

export { ordersRouter };
