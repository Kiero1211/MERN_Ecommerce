import { Router } from "express";
const routes = Router();

import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js";     

routes.use("/api/users/", userRoutes);
routes.use("/api/categories/", categoryRoutes);
routes.use("/api/products/", productRoutes);

export default routes;
