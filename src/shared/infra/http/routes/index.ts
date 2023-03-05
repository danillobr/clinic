import { Router } from "express";

import { clientsRouters } from "./clients.routers";
import { attendantsRouters } from "./attendants.routers";
import { professionalsRouters } from "./professionals.routers";
import { servicesRouters } from "./services.routers";
import { treatmentsRouters } from "./treatments.routers";

const router = Router();

router.use("/clients", clientsRouters);
router.use("/attendants", attendantsRouters);
router.use("/professionals", professionalsRouters);
router.use("/services", servicesRouters);
router.use("/treatments", treatmentsRouters);

export { router };
