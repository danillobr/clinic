import { Router } from "express";
import { AuthenticateClientController } from "@modules/clients/useCases/authenticateClient/AuthenticateClientController";

const authenticateRoutes = Router();

const authenticateClientController = new AuthenticateClientController();

authenticateRoutes.post("/sessions", authenticateClientController.handle);

export { authenticateRoutes };
