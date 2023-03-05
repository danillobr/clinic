import { Router } from "express";
import { ensureAuthenticatedAttendant } from "../middlewares/ensureAuthenticatedAttendant";
import { ensureAttendantAdmin } from "../middlewares/ensureAttendantAdmin";
import { CreateServiceController } from "@modules/services/useCases/createService/CreateServiceController";
import { ListServicesController } from "@modules/services/useCases/listService/ListServicesController";

const servicesRouters = Router();

const createServiceController = new CreateServiceController();
const listServicesController = new ListServicesController();

servicesRouters.post(
  "/",
  ensureAuthenticatedAttendant,
  ensureAttendantAdmin,
  createServiceController.handle
);

servicesRouters.get("/list", listServicesController.handle);

export { servicesRouters };
