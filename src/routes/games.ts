import { Hono } from "hono";

import {
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
  updateGame,
} from "../controllers/game-controller";
import { basicAuth } from "../middlewares/basic-auth";

const gamesRouter = new Hono();

gamesRouter.use("*", basicAuth);

// Get all games
gamesRouter.get("/", getAllGames);

// Get a game by ID
gamesRouter.get("/:id", getGameById);

// Create a new game
gamesRouter.post("/create", createGame);

// Update a game by ID
gamesRouter.put("/update/:id", updateGame);

// Delete a game by ID
gamesRouter.delete("/delete/:id", deleteGame);

export { gamesRouter };
