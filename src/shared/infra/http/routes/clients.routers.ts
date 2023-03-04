import { Router } from "express";
import { CreateClientController } from "@modules/clients/useCases/createClient/CreateClientController";
import { AuthenticateClientController } from "@modules/clients/useCases/authenticateClient/AuthenticateClientController";

const clientsRouters = Router();

const authenticateClientController = new AuthenticateClientController();
const createClientController = new CreateClientController();

clientsRouters.post("/", createClientController.handle);
clientsRouters.post("/sessions", authenticateClientController.handle);

export { clientsRouters };
