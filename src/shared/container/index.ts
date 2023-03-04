import { container } from "tsyringe";

import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { IAttendantRepository } from "@modules/attendant/repositories/IAttendantRepository";
import { AttendantRepository } from "@modules/attendant/infra/typeorm/repositories/AttendantRepository";
import { ClientsRepository } from "@modules/clients/infra/typeorm/repositories/ClientsRepository";
import { IProfessionalsRepository } from "@modules/professional/repositories/IProfessionalsRepository";
import { ProfessionalsRepository } from "@modules/professional/infra/typeorm/repositories/ProfessionalsRepository";

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  ClientsRepository
);

container.registerSingleton<IAttendantRepository>(
  "AttendantRepository",
  AttendantRepository
);

container.registerSingleton<IProfessionalsRepository>(
  "ProfessionalsRepository",
  ProfessionalsRepository
);
