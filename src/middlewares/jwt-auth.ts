import type { MiddlewareHandler } from "hono";

import { validateSession } from "../services/auth-service";

export const jwtAuth: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized - Token required" }, 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return c.json({ error: "Invalid authorization header" }, 401);
  }

  try {
    const user = await validateSession(token);

    if (!user) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }

    // Adiciona usuário e token ao contexto
    c.set("user", user);
    c.set("token", token);

    await next();
  }
  catch (error) {
    console.error("Error during JWT authentication:", error);
    return c.json({ error: "Authentication failed" }, 500);
  }
};

export const adminAuth: MiddlewareHandler = async (c, next) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "User not found in context" }, 401);
  }

  if (!user.isAdmin) {
    return c.json({ error: "Forbidden: Admin access required" }, 403);
  }

  await next();
};
