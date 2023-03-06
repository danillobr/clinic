import { Service } from "@modules/services/infra/typeorm/entities/Service";
import { ServicesRepositoryInMemory } from "@modules/services/repositories/in-memory/ServicesRepositoryInMemory";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { CreateServiceUseCase } from "../createService/CreateServiceUseCase";
import { ListServicesUseCase } from "./ListServicesUseCase";

let servicesRepositoryInMemory: IServicesRepository;
let createServiceUseCase: CreateServiceUseCase;
let listServicesUseCase: ListServicesUseCase;

describe("List all services", () => {
  beforeEach(() => {
    servicesRepositoryInMemory = new ServicesRepositoryInMemory();
    createServiceUseCase = new CreateServiceUseCase(servicesRepositoryInMemory);
    listServicesUseCase = new ListServicesUseCase(servicesRepositoryInMemory);
  });

  it("should be able to list all services", async () => {
    let services: Service[] = [];

    const service1 = {
      name: "service 1",
      value: 10,
      time: 11,
      percentage: 5,
    };

    const service2 = {
      name: "service 2",
      value: 14,
      time: 8,
      percentage: 3,
    };

    const serv1 = await createServiceUseCase.execute({
      name: service1.name,
      value: service1.value,
      time: service1.time,
      percentage: service1.percentage,
    });

    const serv2 = await createServiceUseCase.execute({
      name: service2.name,
      value: service2.value,
      time: service2.time,
      percentage: service2.percentage,
    });

    services.push(serv1, serv2);

    const listServices = await listServicesUseCase.execute();

    expect(listServices).toEqual(services);
    expect(listServices.length).toBe(2);
  });
});
