import { Router } from "express";
const routes = Router();

import userRoute from "./userRoutes.js";

routes.use(userRoute);

export default routes;
