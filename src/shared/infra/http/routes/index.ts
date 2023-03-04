import { Router } from "express";

import { clientsRouters } from "./clients.routers";
import { attendantsRouters } from "./attendant.routers";

const router = Router();

router.use("/clients", clientsRouters);
router.use("/attendants", attendantsRouters);

export { router };
