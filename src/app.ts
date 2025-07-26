import { Hono } from "hono";
import { logger } from "hono/logger";

import { gamesRouter } from "../src/routes/games";

const app = new Hono();

app.use(logger());

app.route("/", gamesRouter);
app.route("/games/:id", gamesRouter);
app.route("/games/create", gamesRouter);
app.route("/games/update/:id", gamesRouter);
app.route("/games/delete/:id", gamesRouter);
export default app;
