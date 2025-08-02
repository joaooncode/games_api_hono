import { Hono } from "hono";

import { login, logout, logoutAll, me } from "../controllers/auth-controller";
import { jwtAuth } from "../middlewares/jwt-auth";

const authRouter = new Hono();

// Rotas públicas
authRouter.post("/login", login);

// Rotas protegidas
authRouter.post("/logout", jwtAuth, logout);
authRouter.post("/logout-all", jwtAuth, logoutAll);
authRouter.get("/me", jwtAuth, me);

export { authRouter };
