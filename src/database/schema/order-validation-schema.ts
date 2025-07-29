import * as z from "zod";

export const orderZodSchema = z.object({
  userId: z.number().min(1),
  gameId: z.number().min(1),
  orderDate: z.date(),
  orderQuantity: z.number().min(1),
  orderStatus: z.boolean().optional(),
  orderReturnDate: z.date().optional(),
});

export const orderRequestSchema = z.object({
  gameId: z.number(),
  orderQuantity: z.number().min(1),
});
