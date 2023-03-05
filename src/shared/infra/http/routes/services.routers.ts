import { Router } from "express";
import { ensureAuthenticatedAttendant } from "../middlewares/ensureAuthenticatedAttendant";
import { ensureAttendantAdmin } from "../middlewares/ensureAttendantAdmin";
import { CreateServiceController } from "@modules/services/useCases/createService/CreateServiceController";

const servicesRouters = Router();

const createServiceController = new CreateServiceController();

servicesRouters.post(
  "/",
  ensureAuthenticatedAttendant,
  ensureAttendantAdmin,
  createServiceController.handle
);

export { servicesRouters };
