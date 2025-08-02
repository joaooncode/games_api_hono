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
  email: z.email().max(255), // Novo campo
  password: z.string().min(8),
  isAdmin: z.boolean().default(false),
});

export const userUpdateZodSchema = z.object({
  username: z.string().min(3).max(100).optional(),
  email: z.email().max(255).optional(), // Novo campo
}).strict();

export const loginZodSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
