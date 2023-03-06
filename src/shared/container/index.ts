import { container } from "tsyringe";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ClientsRepository } from "@modules/clients/infra/typeorm/repositories/ClientsRepository";
import { IProfessionalsRepository } from "@modules/professional/repositories/IProfessionalsRepository";
import { ProfessionalsRepository } from "@modules/professional/infra/typeorm/repositories/ProfessionalsRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { ServicesRepository } from "@modules/services/infra/typeorm/repositories/ServicesRepository";
import { ITreatmentsRepository } from "@modules/treatments/repositories/ITreatmentsRepository";
import { TreatmentsRepository } from "@modules/treatments/infra/typeorm/repositories/TreatmentsRepository";
import { IAttendantsRepository } from "@modules/attendants/repositories/IAttendantsRepository";
import { AttendantsRepository } from "@modules/attendants/infra/typeorm/repositories/AttendantsRepository";

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  ClientsRepository
);

container.registerSingleton<IAttendantsRepository>(
  "AttendantsRepository",
  AttendantsRepository
);

container.registerSingleton<IProfessionalsRepository>(
  "ProfessionalsRepository",
  ProfessionalsRepository
);

container.registerSingleton<IServicesRepository>(
  "ServicesRepository",
  ServicesRepository
);

container.registerSingleton<ITreatmentsRepository>(
  "TreatmentsRepository",
  TreatmentsRepository
);
