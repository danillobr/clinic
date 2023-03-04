import { CreateAttendantController } from "@modules/attendant/useCases/createAttendant/CreateAttendantController";
import { Router } from "express";
import { ensureAttendantAdmin } from "../middlewares/ensureAttendantAdmin";
import { ensureAuthenticatedAttendant } from "../middlewares/ensureAuthenticatedAttendant";

const attendantsRouters = Router();

const createAttendantController = new CreateAttendantController();

attendantsRouters.post(
  "/",
  ensureAuthenticatedAttendant,
  ensureAttendantAdmin,
  createAttendantController.handle
);

export { attendantsRouters };
