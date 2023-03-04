import { container } from "tsyringe";

import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { IAttendantRepository } from "@modules/attendant/repositories/IAttendantRepository";
import { AttendantRepository } from "@modules/attendant/infra/typeorm/repositories/AttendantRepository";
import { ClientsRepository } from "@modules/clients/infra/typeorm/repositories/ClientsRepository";

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  ClientsRepository
);

container.registerSingleton<IAttendantRepository>(
  "AttendantRepository",
  AttendantRepository
);
