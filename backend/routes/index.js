import { Router } from "express";
const routes = Router();

import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js"; 
import uploadRoutes from "./uploadRoutes.js";
import orderRoutes from "./orderRoutes.js"    

routes.use("/api/users/", userRoutes);
routes.use("/api/categories/", categoryRoutes);
routes.use("/api/products/", productRoutes);
routes.use("/api/upload/", uploadRoutes);
routes.use("/api/orders/", orderRoutes);

export default routes;
