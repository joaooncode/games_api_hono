import type { Context } from "hono";

import { loginZodSchema } from "../database/schema/zod-schema";
import { authenticateUser, revokeAllUserSessions, revokeSession } from "../services/auth-service";

export async function login(c: Context) {
  try {
    const credentials = await c.req.json();
    const validation = loginZodSchema.safeParse(credentials);

    if (!validation.success) {
      return c.json({ error: "Invalid credentials format", details: validation.error }, 400);
    }

    const authResult = await authenticateUser(validation.data);

    if (!authResult) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    return c.json({
      message: "Login successful",
      ...authResult,
    });
  }
  catch (error) {
    console.error("Error during login:", error);
    return c.json({ error: "Login failed" }, 500);
  }
}

export async function logout(c: Context) {
  try {
    const token = c.get("token");

    if (!token) {
      return c.json({ error: "No active session" }, 400);
    }

    const success = await revokeSession(token);

    if (!success) {
      return c.json({ error: "Failed to logout" }, 500);
    }

    return c.json({ message: "Logout successful" });
  }
  catch (error) {
    console.error("Error during logout:", error);
    return c.json({ error: "Logout failed" }, 500);
  }
}

export async function logoutAll(c: Context) {
  try {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "User not found" }, 401);
    }

    const success = await revokeAllUserSessions(user.id);

    if (!success) {
      return c.json({ error: "Failed to logout from all devices" }, 500);
    }

    return c.json({ message: "Logged out from all devices successfully" });
  }
  catch (error) {
    console.error("Error during logout all:", error);
    return c.json({ error: "Logout failed" }, 500);
  }
}

export async function me(c: Context) {
  try {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "User not found" }, 401);
    }

    return c.json({ user });
  }
  catch (error) {
    console.error("Error getting user info:", error);
    return c.json({ error: "Failed to get user info" }, 500);
  }
}
