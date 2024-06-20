import { Router } from "express";
import { createUser, loginUser, logoutUser, getAllUsers } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const route = Router();

route.get("/", authenticate, authorizeAdmin, getAllUsers);

route.post("/", createUser);
route.post("/auth", loginUser);
route.post("/logout", logoutUser);

export default route;