import { sign, verify } from "hono/jwt";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 dias

export async function generateToken(userId: number): Promise<string> {
  const payload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + JWT_EXPIRES_IN,
  };

  return await sign(payload, JWT_SECRET);
}

export async function verifyToken(token: string): Promise<{ userId: number } | null> {
  try {
    const payload = await verify(token, JWT_SECRET);
    return { userId: payload.userId as number };
  }
  catch {
    return null;
  }
}

export function getTokenExpiration(): Date {
  return new Date(Date.now() + JWT_EXPIRES_IN * 1000);
}
