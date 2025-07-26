import { eq } from "drizzle-orm";

import type { Game } from "../interfaces/Game";

import { db } from "../database/db";
import { gameTable } from "../database/schema/game-schema";

export async function findAllGames() {
  return db.select().from(gameTable).orderBy(gameTable.id);
}

export async function findGameById(id: number) {
  const game = await db.select().from(gameTable).where(eq(gameTable.id, id));
  if (game.length === 0) {
    return null;
  }
  return game[0];
}

export async function createGame(game: Omit<Game, "id">) {
  try {
    const inserted = await db.insert(gameTable).values(game).returning();
    return inserted[0];
  }
  catch (error) {
    console.error("Error creating game:", error);
  }
}

export async function updateGame(id: number, game: Partial<Omit<Game, "id">>) {
  const updated = await db
    .update(gameTable)
    .set(game)
    .where(eq(gameTable.id, id))
    .returning();
  try {
    if (updated.length === 0) {
      return null;
    }
    return updated[0];
  }
  catch (error) {
    console.error("Error updating game:", error);
  }
}

export async function deleteGame(id: number) {
  try {
    const deleted = await db
      .delete(gameTable)
      .where(eq(gameTable.id, id))
      .returning();
    if (deleted.length === 0) {
      return null;
    }
    return deleted[0];
  }
  catch (error) {
    console.error("Error deleting game:", error);
  }
}
