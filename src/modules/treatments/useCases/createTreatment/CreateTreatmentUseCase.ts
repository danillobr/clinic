import { inject, injectable } from "tsyringe";

import { ITreatmentsRepository } from "@modules/treatments/repositories/ITreatmentsRepository";
import { Client } from "@modules/clients/infra/typeorm/entities/Client";
import { Professional } from "@modules/professional/infra/typeorm/entities/Professional";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { IProfessionalsRepository } from "@modules/professional/repositories/IProfessionalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { Treatment } from "@modules/treatments/infra/typeorm/entities/Treatment";

interface IRequest {
  total_amount?: number;
  total_commission?: number;
  total_time_services?: number;
  client: Client;
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
    @inject("ServicesRepository")
    private servicesRepository: IServicesRepository
  ) {}

  async execute({
    client,
    professional,
    services,
  }: IRequest): Promise<Treatment> {
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

    console.log(total_time_services);

    const treatment = await this.treatmentsRepository.create({
      total_amount,
      total_commission,
      total_time_services,
      client,
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
