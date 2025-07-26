import { Hono } from "hono";

import {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from "../controllers/gameController";

const gamesRouter = new Hono();

// Get all games
gamesRouter.get("/games", getAllGames);

// Get a game by ID
gamesRouter.get("/games/:id", getGameById);

// Create a new game
gamesRouter.post("/games/create", createGame);

// Update a game by ID
gamesRouter.put("/games/update/:id", updateGame);

// Delete a game by ID
gamesRouter.delete("/games/delete/:id", deleteGame);

export { gamesRouter };
