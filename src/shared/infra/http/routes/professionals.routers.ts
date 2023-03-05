import { Router } from "express";
import { CreateProfessionalController } from "@modules/professional/useCases/createProfessional/CreateProfessionalController";
import { ensureAuthenticatedAttendant } from "../middlewares/ensureAuthenticatedAttendant";
import { ensureAttendantAdmin } from "../middlewares/ensureAttendantAdmin";
import { ListProfessionalsController } from "@modules/professional/useCases/listProfessional/ListProfessionalsController";

const professionalsRouters = Router();

const createProfessionalController = new CreateProfessionalController();
const listProfissionalsController = new ListProfessionalsController();

professionalsRouters.post(
  "/",
  ensureAuthenticatedAttendant,
  ensureAttendantAdmin,
  createProfessionalController.handle
);

professionalsRouters.get(
  "/list",
  ensureAuthenticatedAttendant,
  listProfissionalsController.handle
);

export { professionalsRouters };
