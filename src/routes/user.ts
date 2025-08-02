import { Hono } from "hono";

import { createNewUser, deleteUser, getAllUsers, getUserById, restoreUserById, updateUserById } from "../controllers/user-controller";
import { requireAdminOrOwner } from "../middlewares/admin-owner-auth";
import { adminAuth, jwtAuth } from "../middlewares/jwt-auth";

const userRouter = new Hono();

userRouter.get("/", jwtAuth, adminAuth, getAllUsers);
userRouter.get("/:id", jwtAuth, requireAdminOrOwner, getUserById);
userRouter.put("/update/:id", jwtAuth, requireAdminOrOwner, updateUserById);
userRouter.post("/create", createNewUser);
userRouter.delete("/soft-delete/:id", jwtAuth, adminAuth, deleteUser);
userRouter.put("/restore/:id", jwtAuth, adminAuth, restoreUserById);

export { userRouter };
