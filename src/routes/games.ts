import { Hono } from "hono";

import {
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
  updateGame,
} from "../controllers/game-controller";
import { adminAuth, jwtAuth } from "../middlewares/jwt-auth";

const gamesRouter = new Hono();

// Get all games
gamesRouter.get("/", jwtAuth, getAllGames);

// Get a game by ID
gamesRouter.get("/:id", jwtAuth, getGameById);

// Create a new game
gamesRouter.post("/create", jwtAuth, adminAuth, createGame);

// Update a game by ID
gamesRouter.put("/update/:id", jwtAuth, adminAuth, updateGame);

// Delete a game by ID
gamesRouter.delete("/delete/:id", jwtAuth, adminAuth, deleteGame);

export { gamesRouter };
