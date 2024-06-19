import { Router } from "express";
import { createUser } from "../controllers/userController.js";
const route = Router();

route.post("/", createUser);

export default route;