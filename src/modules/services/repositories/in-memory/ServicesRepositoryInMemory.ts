import { IServicesRepository } from "../IServicesRepository";
import { Service } from "@modules/services/infra/typeorm/entities/Service";
import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";

class ServicesRepositoryInMemory implements IServicesRepository {
  services: Service[] = [];

  async create({
    name,
    value,
    time,
    percentage,
  }: ICreateServiceDTO): Promise<Service> {
    const service = new Service();

    Object.assign(service, {
      name,
      value,
      time,
      percentage,
    });

    this.services.push(service);

    return service;
  }

  async findByName(name: string): Promise<Service> {
    return this.services.find((service) => service.name === name);
  }

  async list(): Promise<Service[]> {
    const all = this.services;
    return all;
  }

  sumTotalAmount(list_ids: string[]): Promise<number> {
    throw new Error("Method not implemented.");
  }

  totalCommission(list_ids: string[]): Promise<number> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<Service> {
    return await this.services.find((service) => service.id === id);
  }
}

export { ServicesRepositoryInMemory };
