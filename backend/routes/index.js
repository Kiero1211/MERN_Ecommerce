import { Router } from "express";
const routes = Router();

import userRoute from "./userRoutes.js";

routes.use("/api/users/", userRoute);

export default routes;
