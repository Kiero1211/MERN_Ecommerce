import { Router } from "express";
const routes = Router();

import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

routes.use("/api/users/", userRoutes);
routes.use("/api/category/", categoryRoutes);

export default routes;
