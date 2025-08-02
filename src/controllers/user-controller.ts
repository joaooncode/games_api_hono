import type { Context } from "hono";

import { userUpdateZodSchema, userZodSchema } from "../database/schema/zod-schema";
import { createUser, findAllUsers, findUserById, restoreUser, softDeleteUser, updateUser } from "../services/user-service";

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
    // Verifica se há usuário autenticado (opcional para esta rota)
    const authenticatedUser = c.get("user"); // undefined se não autenticado

    const userData = await c.req.json();
    const validatedUser = userZodSchema.safeParse(userData);

    if (!validatedUser.success) {
      return c.json({ error: "Could not validate user data" }, 400);
    }

    // Validações de segurança
    const { isAdmin, ...userDataToCreate } = validatedUser.data;

    // Se usuário autenticado e não é admin, não pode criar admin
    if (authenticatedUser && !authenticatedUser.isAdmin && isAdmin) {
      return c.json({
        error: "Only administrators can create admin users",
      }, 403);
    }

    // Se não há usuário autenticado, não pode criar admin
    if (!authenticatedUser && isAdmin) {
      return c.json({
        error: "Cannot create admin user without authentication",
      }, 403);
    }

    // Cria usuário com isAdmin apenas se permitido
    const finalUserData = {
      ...userDataToCreate,
      isAdmin: Boolean(isAdmin && authenticatedUser?.isAdmin),
    };

    const createdUser = await createUser(finalUserData);
    return c.json(createdUser, 201);
  }
  catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

// PUT (update user)
export async function updateUserById(c: Context) {
  try {
    const id = Number(c.req.param("id"));

    const userData = await c.req.json();

    const allowedData = {
      username: userData.username,
    };

    const validatedUser = userUpdateZodSchema.safeParse(allowedData);
    if (!validatedUser.success) {
      return c.json({ error: "Could not validate user data" }, 400);
    }

    const updatedUser = await updateUser(id, validatedUser.data);
    if (!updatedUser) {
      return c.json({ error: "User not found or could not be updated" }, 404);
    }
    return c.json(updatedUser, 200);
  }
  catch (error) {
    console.error("Error updating user:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

// DELETE (soft delete)

export async function deleteUser(c: Context) {
  try {
    const id = Number(c.req.param("id"));
    const success = await softDeleteUser(id);
    if (!success) {
      return c.json({ error: "User not found or could not be deleted" }, 404);
    }
    return c.json({ message: "User deleted successfully" }, 200);
  }
  catch (error) {
    console.error("Error deleting user:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

// PUT (restore user)
export async function restoreUserById(c: Context) {
  try {
    const id = Number(c.req.param("id"));
    const success = await restoreUser(id);
    if (!success) {
      return c.json({ error: "User not found or could not be restored" }, 404);
    }
    return c.json({ message: "User restored successfully" }, 200);
  }
  catch (error) {
    console.error("Error restoring user:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
