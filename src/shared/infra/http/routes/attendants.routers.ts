import { AuthenticateAttendantController } from "@modules/attendants/useCases/authenticateAttendant/AuthenticateAttendantController";
import { CreateAttendantController } from "@modules/attendants/useCases/createAttendant/CreateAttendantController";
import { ListAttendantsController } from "@modules/attendants/useCases/listAttendant/ListAttendantController";
import { Router } from "express";
import { ensureAttendantAdmin } from "../middlewares/ensureAttendantAdmin";
import { ensureAuthenticatedAttendant } from "../middlewares/ensureAuthenticatedAttendant";

const attendantsRouters = Router();

const createAttendantController = new CreateAttendantController();
const authenticateAttendantController = new AuthenticateAttendantController();
const listAttendantController = new ListAttendantsController();

attendantsRouters.post(
  "/",
  ensureAuthenticatedAttendant,
  ensureAttendantAdmin,
  createAttendantController.handle
);

attendantsRouters.get("/", listAttendantController.handle);

attendantsRouters.post("/sessions", authenticateAttendantController.handle);

export { attendantsRouters };
