import type { MiddlewareHandler } from "hono";

export const requireAdminOrOwner: MiddlewareHandler = async (c, next) => {
  const user = c.get("user");
  const requestedUserId = Number(c.req.param("id"));

  if (!user) {
    return c.json({ error: "User not found in context" }, 401);
  }

  if (user.isAdmin || user.id === requestedUserId) {
    await next();
  }
  else {
    return c.json({ error: "Unauthorized" }, 403);
  }
};
