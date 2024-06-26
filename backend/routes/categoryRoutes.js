import { Router } from "express";
const router = Router();

import { authorize, authorizeAdmin } from "../middlewares/authMiddleware.js";

import { createCategory } from "../controllers/categoryController.js";

router.route("/").post(createCategory);

export default router;