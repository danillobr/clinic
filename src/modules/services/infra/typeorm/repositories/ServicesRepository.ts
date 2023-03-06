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

  async sumTotalAmount(list_ids: string[]): Promise<number> {
    const serviceList = await this.repository.findByIds(list_ids);
    const total = serviceList.reduce((accumulator, value) => {
      return accumulator + Number(value.value);
    }, 0);

    return total;
  }

  async sumTotalTimeServices(list_ids: string[]): Promise<number> {
    const serviceList = await this.repository.findByIds(list_ids);
    const total = serviceList.reduce((accumulator, value) => {
      return accumulator + Number(value.time);
    }, 0);

    return total;
  }

  async totalCommission(list_ids: string[]): Promise<number> {
    const serviceList = await this.repository.findByIds(list_ids);
    const total = serviceList.reduce((accumulator, value) => {
      return (
        accumulator + Number(value.value) * Number(value.percentage) * 0.01
      );
    }, 0);

    return total;
  }

  async findById(id: string): Promise<Service> {
    return await this.repository.findOne(id);
  }
}

export { ServicesRepository };
