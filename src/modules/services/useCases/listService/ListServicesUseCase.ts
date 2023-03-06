import { inject, injectable } from "tsyringe";

import { Professional } from "@modules/professional/infra/typeorm/entities/Professional";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { Service } from "@modules/services/infra/typeorm/entities/Service";

@injectable()
class ListServicesUseCase {
  constructor(
    @inject("ServicesRepository")
    private servicesRepository: IServicesRepository
  ) {}

  async execute(): Promise<Service[]> {
    const services = await this.servicesRepository.list();
    return services;
  }
}

export { ListServicesUseCase };
