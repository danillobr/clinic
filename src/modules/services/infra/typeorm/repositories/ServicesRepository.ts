import { Repository, getRepository } from "typeorm";

import { Service } from "../entities/Service";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";

class ServicesRepository implements IServicesRepository {
  private repository: Repository<Service>;

  constructor() {
    this.repository = getRepository(Service);
  }

  async create({
    name,
    value,
    time,
    percentage,
  }: ICreateServiceDTO): Promise<Service> {
    const service = this.repository.create({
      name,
      value,
      time,
      percentage,
    });

    await this.repository.save(service);

    return service;
  }

  async findByName(name: string): Promise<Service> {
    return await this.repository.findOne({ name });
  }

  async list(): Promise<Service[]> {
    const services = await this.repository.find();
    return services;
  }
}

export { ServicesRepository };
