import { CreateTreatmentController } from "@modules/treatments/useCases/createTreatment/CreateTreatmentController";
import { ExecuteTreatmentController } from "@modules/treatments/useCases/executeTreatment/ExecuteTreatmentController";
import { ListTreatmentController } from "@modules/treatments/useCases/listTreatment/ListTreatmentController";
import { ListTreatmentByIdController } from "@modules/treatments/useCases/listTreatmentById/ListTreatmentByIdController";

import { Router } from "express";
import { ensureAuthenticatedAttendant } from "../middlewares/ensureAuthenticatedAttendant";

import { ensureAuthenticatedClient } from "../middlewares/ensureAuthenticatedClient";

const treatmentsRouters = Router();

const createTreatmentsController = new CreateTreatmentController();
const listTreatmentController = new ListTreatmentController();
const listTreatmentByIdController = new ListTreatmentByIdController();
const executeTreatmentController = new ExecuteTreatmentController();

treatmentsRouters.post(
  "/",
  ensureAuthenticatedClient,
  createTreatmentsController.handle
);

treatmentsRouters.get(
  "/me",
  ensureAuthenticatedClient,
  listTreatmentByIdController.handle
);

treatmentsRouters.get(
  "/",
  ensureAuthenticatedAttendant,
  listTreatmentController.handle
);

treatmentsRouters.post(
  "/execute",
  ensureAuthenticatedAttendant,
  executeTreatmentController.handle
);

export { treatmentsRouters };
