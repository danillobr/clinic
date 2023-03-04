import { Router } from "express";
import { CreateClientController } from "modules/clients/useCases/CreateClientController";

const clientsRouters = Router();

const createClientController = new CreateClientController();

clientsRouters.post("/", createClientController.handle);

export { clientsRouters };
