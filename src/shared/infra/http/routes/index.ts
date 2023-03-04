import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";

import { clientsRouters } from "./clients.routers";

const router = Router();

router.use("/clients", clientsRouters);
router.use(authenticateRoutes);

export { router };
