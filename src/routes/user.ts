import { Hono } from "hono";

import { createNewUser, deleteUser, getAllUsers, getUserById, restoreUserById, updateUserById } from "../controllers/user-controller";

const userRouter = new Hono();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/create", createNewUser);
userRouter.put("/update/:id", updateUserById);
userRouter.delete("/soft-delete/:id", deleteUser);
userRouter.put("/restore/:id", restoreUserById);
export { userRouter };
