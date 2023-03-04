import { Router } from "express";

import { clientsRouters } from "./clients.routers";

const router = Router();

router.use("/clients", clientsRouters);

export { router };
