import { Hono } from "hono";

import { createNewUser, deleteUser, getAllUsers, getUserById, restoreUserById, updateUserById } from "../controllers/user-controller";
import { requireAdmin } from "../middlewares/admin-auth";
import { requireAdminOrOwner } from "../middlewares/admin-owner-auth";
import { basicAuth } from "../middlewares/basic-auth";

const userRouter = new Hono();

userRouter.get("/", requireAdmin, getAllUsers);
userRouter.get("/:id", basicAuth, requireAdminOrOwner, getUserById);
userRouter.put("/update/:id", basicAuth, requireAdminOrOwner, updateUserById);
userRouter.post("/create", createNewUser);
userRouter.delete("/soft-delete/:id", requireAdmin, deleteUser);
userRouter.put("/restore/:id", requireAdmin, restoreUserById);
export { userRouter };
