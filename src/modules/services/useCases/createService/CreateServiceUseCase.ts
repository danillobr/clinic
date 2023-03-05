import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { Service } from "@modules/services/infra/typeorm/entities/Service";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateServiceUseCase {
  constructor(
    @inject("ServicesRepository")
    private servicesRepository: IServicesRepository
  ) {}

  async execute({
    name,
    value,
    time,
    percentage,
  }: ICreateServiceDTO): Promise<Service> {
    const serviceAlreadyExist = await this.servicesRepository.findByName(name);

    if (!serviceAlreadyExist) {
      throw new AppError("Service already exists!");
    }

    const service = await this.servicesRepository.create({
      name,
      value,
      time,
      percentage,
    });

    return service;
  }
}

export { CreateServiceUseCase };
