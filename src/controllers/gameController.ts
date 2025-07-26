import type { Context } from "hono";
import {
  gameZodSchema,
  gameUpdateZodSchema,
} from "../database/schema/zodSchema";

import {
  findAllGames,
  findGameById,
  createGame as createGameService,
  updateGame as updateGameService,
  deleteGame as deleteGameService,
} from "../services/gameService";

// GET
export async function getAllGames(c: Context) {
  const games = await findAllGames();
  return c.json(games);
}
// GET by ID
export async function getGameById(c: Context) {
  const id = c.req.param("id");
  const game = await findGameById(Number(id));
  if (!game) {
    return c.notFound();
  }
  return c.json(game);
}

// POST
export async function createGame(c: Context) {
  const newGame = await c.req.json();
  const validation = gameZodSchema.safeParse(newGame);
  if (!validation.success) {
    return c.json({ error: validation.error.format() }, 400);
  }
  const createdGame = await createGameService(newGame);
  return c.json(createdGame, 201);
}

// PUT

export async function updateGame(c: Context) {
  const id = c.req.param("id");
  const updatedGame = await c.req.json();
  const validation = gameUpdateZodSchema.safeParse(updatedGame);
  if (!validation.success) {
    return c.json({ error: validation.error.format() }, 400);
  }
  const game = await updateGameService(Number(id), updatedGame);
  if (!game) {
    return c.notFound();
  }
  return c.json(game);
}

// DELETE
export async function deleteGame(c: Context) {
  const id = c.req.param("id");
  const game = await deleteGameService(Number(id));
  if (!game) {
    return c.notFound();
  }
  return c.json({ message: "Game deleted successfully" });
}
