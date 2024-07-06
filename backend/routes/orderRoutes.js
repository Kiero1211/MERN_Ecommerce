import { Router } from "express";
import { authorize, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createOrder } from "../controllers/orderController.js";
const router = Router();

router.route("/create").post(authorize, createOrder);

export default router;