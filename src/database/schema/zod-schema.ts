import * as z from "zod";

export const gameZodSchema = z.object({
  title: z.string().max(255),
  genre: z.string().max(100),
  releaseYear: z.number().int(),
  developer: z.string().max(100),
  category: z.enum(["Bronze", "Silver", "Gold", "Platinum", "Diamond"]),
  isAvailable: z.boolean(),
});

export const gameUpdateZodSchema = gameZodSchema.partial();

export const userZodSchema = z.object({
  username: z.string().max(100),
  password: z.string().min(6),
  isAdmin: z.boolean().default(false),
});

export const userUpdateZodSchema = userZodSchema.partial();
