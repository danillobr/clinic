import { container } from "tsyringe";

import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";

import { ClientsRepository } from "@modules/clients/infra/typeorm/repositories/ClientsRepository";
import { IProfessionalsRepository } from "@modules/professional/repositories/IProfessionalsRepository";
import { ProfessionalsRepository } from "@modules/professional/infra/typeorm/repositories/ProfessionalsRepository";
import { IAttendantRepository } from "@modules/attendants/repositories/IAttendantRepository";
import { AttendantRepository } from "@modules/attendants/infra/typeorm/repositories/AttendantRepository";

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
