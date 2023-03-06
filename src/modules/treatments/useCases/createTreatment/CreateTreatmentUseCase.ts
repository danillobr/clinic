import { inject, injectable } from "tsyringe";

import { ITreatmentsRepository } from "@modules/treatments/repositories/ITreatmentsRepository";
import { Client } from "@modules/clients/infra/typeorm/entities/Client";
import { Attendant } from "@modules/attendants/infra/typeorm/entities/Attendant";
import { Professional } from "@modules/professional/infra/typeorm/entities/Professional";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { IProfessionalsRepository } from "@modules/professional/repositories/IProfessionalsRepository";
import { IAttendantsRepository } from "@modules/attendants/repositories/IAttendantsRepository";
import { AppError } from "@shared/errors/AppError";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { Treatment } from "@modules/treatments/infra/typeorm/entities/Treatment";

interface IRequest {
  total_amount?: number;
  total_commission?: number;
  total_time_services?: number;
  client: Client;
  attendant: Attendant;
  professional: Professional;
  services: string[];
}

@injectable()
class CreateTreatmentUseCase {
  constructor(
    @inject("TreatmentsRepository")
    private treatmentsRepository: ITreatmentsRepository,
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository,
    @inject("ProfessionalsRepository")
    private professionalsRepository: IProfessionalsRepository,
    @inject("AttendantsRepository")
    private attendantsRepository: IAttendantsRepository,
    @inject("ServicesRepository")
    private servicesRepository: IServicesRepository
  ) {}

  async execute({
    client,
    attendant,
    professional,
    services,
  }: IRequest): Promise<Treatment> {
    const attendantExist = await this.attendantsRepository.findById(
      attendant.id
    );

    if (!attendantExist) {
      throw new AppError("Attendant not exists!");
    }

    const clientExist = await this.clientsRepository.findById(client.id);

    if (!clientExist) {
      throw new AppError("Client not exists!");
    }

    const professionalExists = await this.professionalsRepository.findById(
      professional.id
    );

    if (!professionalExists) {
      throw new AppError("Professional not exists!");
    }

    const listServices = services?.map((id) => id);

    if (!listServices || listServices.length <= 0) {
      throw new AppError("Invalid services");
    }

    const total_amount = await this.servicesRepository.sumTotalAmount(
      listServices
    );

    const total_commission = await this.servicesRepository.totalCommission(
      listServices
    );

    const total_time_services =
      await this.servicesRepository.sumTotalTimeServices(listServices);

    const treatment = await this.treatmentsRepository.create({
      total_amount,
      total_commission,
      total_time_services,
      client,
      attendant,
      professional,
      services: await Promise.all(
        services.map(async (service_id) => {
          return await this.servicesRepository.findById(service_id);
        })
      ),
    });

    return treatment;
  }
}

export { CreateTreatmentUseCase };
