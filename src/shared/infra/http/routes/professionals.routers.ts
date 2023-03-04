import { Router } from "express";
import { CreateProfessionalController } from "@modules/professional/useCases/createProfessional/CreateProfessionalController";
import { ensureAuthenticatedAttendant } from "../middlewares/ensureAuthenticatedAttendant";
import { ensureAttendantAdmin } from "../middlewares/ensureAttendantAdmin";

const professionalsRouters = Router();

const createProfessionalController = new CreateProfessionalController();

professionalsRouters.post(
  "/",
  ensureAuthenticatedAttendant,
  ensureAttendantAdmin,
  createProfessionalController.handle
);

export { professionalsRouters };
