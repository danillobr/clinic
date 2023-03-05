import { CreateTreatmentController } from "@modules/treatments/useCases/createTreatment/CreateTreatmentController";
import { Router } from "express";

import { ensureAuthenticatedClient } from "../middlewares/ensureAuthenticatedClient";

const treatmentsRouters = Router();

const createTreatmentsController = new CreateTreatmentController();

treatmentsRouters.post(
  "/",
  ensureAuthenticatedClient,
  createTreatmentsController.handle
);

export { treatmentsRouters };
