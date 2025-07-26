import { Hono } from "hono";
import { logger } from "hono/logger";

import { gamesRouter } from "../src/routes/games";
import { userRouter } from "./routes/user";

const app = new Hono();

app.use(logger());

app.onError((err, c) => {
  console.error("Error occurred:", err);
  return c.json({ error: "Internal Server Error" }, 500);
});

app.route("/", gamesRouter);
app.route("/games/:id", gamesRouter);
app.route("/games/create", gamesRouter);
app.route("/games/update/:id", gamesRouter);
app.route("/games/delete/:id", gamesRouter);

// Users
app.route("/users", userRouter);
app.route("/users/:id", userRouter);
app.route("/users/create", userRouter);

export default app;
