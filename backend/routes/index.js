import { Router } from "express";
const routes = Router();

import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

routes.use("/api/users/", userRoutes);
routes.use("/api/categories/", categoryRoutes);

export default routes;
