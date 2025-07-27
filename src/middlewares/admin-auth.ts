import type { MiddlewareHandler } from "hono";

import bcrypt from "bcrypt";
import { and, eq, isNull } from "drizzle-orm";
import { Buffer } from "node:buffer";

import { db } from "../database/db";
import { users as usersTable } from "../database/schema/user-schema";

export const requireAdmin: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const base64Credentials = authHeader.split(" ")[1];
  if (!base64Credentials) {
    return c.json({ error: "Invalid authorization header" }, 401);
  }

  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [username, password] = credentials.split(":");

  if (!username || !password) {
    return c.json({ error: "Invalid credentials format" }, 401);
  }

  try {
    // Busca usuário pelo username (apenas usuários não deletados)
    const users = await db.select()
      .from(usersTable)
      .where(and(eq(usersTable.username, username), isNull(usersTable.deletedAt)));

    if (!users || users.length === 0) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const user = users[0];
    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // Verifica se é admin
    if (!user.isAdmin) {
      return c.json({ error: "Admin access required" }, 403);
    }

    // Adiciona o usuário ao contexto
    c.set("user", user);

    // Usuário autenticado e é admin, segue para a rota
    await next();
  }
  catch (error) {
    console.error("Error during authentication:", error);
    return c.json({ error: "Authentication failed" }, 500);
  }
};
