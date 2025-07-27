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

app.route("/games", gamesRouter);
app.route("/users", userRouter);

export default app;
