import bcrypt from "bcrypt";
import { and, eq, isNotNull, isNull } from "drizzle-orm";

import type { User } from "../interfaces/user";

import { db } from "../database/db";
import { users as usersTable } from "../database/schema/user-schema";
import { userUpdateZodSchema } from "../database/schema/zod-schema";

export async function findAllUsers() {
  try {
    const users = await db.select()
      .from(usersTable)
      .where(isNull(usersTable.deletedAt))
      .orderBy(usersTable.id);
    if (users.length === 0) {
      return null;
    }
    return users;
  }
  catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}

export async function findUserById(id: number) {
  try {
    const user = await db.select()
      .from(usersTable)
      .where(and(eq(usersTable.id, id), isNull(usersTable.deletedAt)));
    if (!user || user.length === 0) {
      return null;
    }
    return user[0];
  }
  catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function findUserByEmail(email: string) {
  try {
    const user = await db.select()
      .from(usersTable)
      .where(and(eq(usersTable.email, email), isNull(usersTable.deletedAt)));
    if (!user || user.length === 0) {
      return null;
    }
    return user[0];
  }
  catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}

export async function createUser(user: Omit<User, "id" | "createdAt" | "updatedAt" | "deletedAt">) {
  try {
    // Verifica se email já existe
    const existingUser = await findUserByEmail(user.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const userToInsert = { ...user, password: hashedPassword };

    const inserted = await db.insert(usersTable).values(userToInsert).returning();
    return inserted[0];
  }
  catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

export async function updateUser(id: number, user: Partial<User>) {
  try {
    const validatedUser = userUpdateZodSchema.safeParse(user);
    if (!validatedUser.success) {
      console.error("Validation failed:", validatedUser.error);
      return null;
    }

    // Se está atualizando email, verifica se já existe
    if (validatedUser.data.email) {
      const existingUser = await findUserByEmail(validatedUser.data.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email already exists");
      }
    }

    const updated = await db
      .update(usersTable)
      .set(validatedUser.data)
      .where(eq(usersTable.id, id))
      .returning();

    return updated[0];
  }
  catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}

export async function softDeleteUser(id: number) {
  try {
    const user = await db.select()
      .from(usersTable)
      .where(and(eq(usersTable.id, id), isNull(usersTable.deletedAt)));

    if (!user || user.length === 0) {
      return false;
    }

    const now = new Date();
    await db.update(usersTable)
      .set({ deletedAt: now })
      .where(eq(usersTable.id, id));
    return true;
  }
  catch (error) {
    console.error("Error soft deleting user:", error);
    return false;
  }
}

export async function restoreUser(id: number) {
  try {
    const user = await db.select()
      .from(usersTable)
      .where(eq(usersTable.id, id) && isNotNull(usersTable.deletedAt));

    if (!user || user.length === 0) {
      return false;
    }

    await db.update(usersTable)
      .set({ deletedAt: null })
      .where(eq(usersTable.id, id));
    return true;
  }
  catch (error) {
    console.error("Error restoring user:", error);
    return false;
  }
}
