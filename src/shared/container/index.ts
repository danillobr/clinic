import { container } from "tsyringe";

import { ClientsRepository } from "@modules/attendant/infra/typeorm/repositories/ClientsRepository";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  ClientsRepository
);
