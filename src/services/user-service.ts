import type { Context } from "hono";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import type { User } from "../interfaces/user";

import { db } from "../database/db";
import { users as usersTable } from "../database/schema/user-schema";

export async function findAllUsers() {
  try {
    const users = await db.select().from(usersTable).orderBy(usersTable.id);
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
    const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
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

export async function createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">) {
  try {
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
