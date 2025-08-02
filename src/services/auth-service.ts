import bcrypt from "bcrypt";
import { and, eq, gt, isNotNull, isNull } from "drizzle-orm";

import type { AuthResponse, LoginRequest } from "../interfaces/user";

import { db } from "../database/db";
import { sessions, users as usersTable } from "../database/schema/user-schema";
import { generateToken, getTokenExpiration } from "../utils/jwt";

export async function authenticateUser(credentials: LoginRequest): Promise<AuthResponse | null> {
  try {
    const { email, password } = credentials;

    // Busca usuário por email (não deletado)
    const users = await db.select()
      .from(usersTable)
      .where(and(
        eq(usersTable.email, email),
        isNull(usersTable.deletedAt),
        isNotNull(usersTable.email),
      ));

    if (!users || users.length === 0) {
      return null;
    }

    const user = users[0];
    if (!user || !user.email) {
      return null;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return null;
    }

    // Gera token JWT
    const token = await generateToken(user.id);
    const expiresAt = getTokenExpiration();

    // Salva sessão no banco
    await db.insert(sessions).values({
      userId: user.id,
      token,
      expiresAt,
    });

    // Remove senha do retorno
    const { password: _, ...userWithoutPassword } = user;

    return {
      token,
      user: {
        ...userWithoutPassword,
        email: userWithoutPassword.email!, // Garantido pelo isNotNull acima
        createdAt: new Date(userWithoutPassword.createdAt),
        updatedAt: new Date(userWithoutPassword.updatedAt),
        deletedAt: userWithoutPassword.deletedAt || undefined,
      },
      expiresAt,
    };
  }
  catch (error) {
    console.error("Error during authentication:", error);
    return null;
  }
}

export async function validateSession(token: string): Promise<any | null> {
  try {
    // Busca sessão válida
    const sessionQuery = await db.select({
      session: sessions,
      user: usersTable,
    })
      .from(sessions)
      .innerJoin(usersTable, eq(sessions.userId, usersTable.id))
      .where(
        and(
          eq(sessions.token, token),
          gt(sessions.expiresAt, new Date()),
          isNull(usersTable.deletedAt),
        ),
      );

    if (!sessionQuery || sessionQuery.length === 0) {
      return null;
    }

    const sessionData = sessionQuery[0];
    if (!sessionData) {
      return null;
    }

    const { user } = sessionData;
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
  catch (error) {
    console.error("Error validating session:", error);
    return null;
  }
}

export async function revokeSession(token: string): Promise<boolean> {
  try {
    const result = await db.delete(sessions)
      .where(eq(sessions.token, token));

    return (result.rowCount ?? 0) > 0;
  }
  catch (error) {
    console.error("Error revoking session:", error);
    return false;
  }
}

export async function revokeAllUserSessions(userId: number): Promise<boolean> {
  try {
    await db.delete(sessions)
      .where(eq(sessions.userId, userId));

    return true;
  }
  catch (error) {
    console.error("Error revoking user sessions:", error);
    return false;
  }
}
