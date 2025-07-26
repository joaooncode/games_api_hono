import { Hono } from "hono";

import { createNewUser, getAllUsers, getUserById } from "../controllers/user-controller";

const userRouter = new Hono();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/create", createNewUser);

export { userRouter };
