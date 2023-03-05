import { AuthenticateAttendantController } from "@modules/attendants/useCases/authenticateAttendant/AuthenticateAttendantController";
import { CreateAttendantController } from "@modules/attendants/useCases/createAttendant/CreateAttendantController";
import { Router } from "express";
import { ensureAttendantAdmin } from "../middlewares/ensureAttendantAdmin";
import { ensureAuthenticatedAttendant } from "../middlewares/ensureAuthenticatedAttendant";

const attendantsRouters = Router();

const createAttendantController = new CreateAttendantController();
const authenticateAttendantController = new AuthenticateAttendantController();

attendantsRouters.post(
  "/",
  ensureAuthenticatedAttendant,
  ensureAttendantAdmin,
  createAttendantController.handle
);

attendantsRouters.post("/sessions", authenticateAttendantController.handle);

export { attendantsRouters };
