import { Hono } from "hono";

import { createNewUser, deleteUser, getAllUsers, getUserById } from "../controllers/user-controller";

const userRouter = new Hono();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/create", createNewUser);
userRouter.delete("/soft-delete/:id", deleteUser);

export { userRouter };
