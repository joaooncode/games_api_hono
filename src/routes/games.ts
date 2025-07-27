import { Hono } from "hono";

import {
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
  updateGame,
} from "../controllers/game-controller";
import { adminAuth, basicAuth } from "../middlewares/basic-auth";

const gamesRouter = new Hono();

// Get all games
gamesRouter.get("/", basicAuth, getAllGames);

// Get a game by ID
gamesRouter.get("/:id", basicAuth, getGameById);

// Create a new game
gamesRouter.post("/create", basicAuth, adminAuth, createGame);

// Update a game by ID
gamesRouter.put("/update/:id", basicAuth, adminAuth, updateGame);

// Delete a game by ID
gamesRouter.delete("/delete/:id", basicAuth, adminAuth, deleteGame);

export { gamesRouter };
