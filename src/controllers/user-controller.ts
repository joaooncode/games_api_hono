import type { Context } from "hono";

import { userZodSchema } from "../database/schema/zod-schema";
import { createUser, findAllUsers, findUserById } from "../services/user-service";

// GET
export async function getAllUsers(c: Context) {
  const users = await findAllUsers();
  return c.json(users);
}

// GET by ID
export async function getUserById(c: Context) {
  try {
    const userId = Number(c.req.param("id"));
    const user = await findUserById(userId);
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json(user, 200);
  }
  catch (error) {
    console.error("Error fetching user:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

// POST

export async function createNewUser(c: Context) {
  try {
    const userData = await c.req.json();
    const validatedUser = userZodSchema.safeParse(userData);
    if (!validatedUser.success) {
      return c.json({ error: "Could not validate user data" }, 400);
    }

    const createdUser = await createUser(validatedUser.data);
    return c.json(createdUser, 201);
  }
  catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
