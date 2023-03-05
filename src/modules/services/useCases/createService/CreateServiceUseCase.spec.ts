import { ServicesRepositoryInMemory } from "@modules/services/repositories/in-memory/ServicesRepositoryInMemory";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";

import { CreateServiceUseCase } from "./CreateServiceUseCase";

let servicesRepositoryInMemory: IServicesRepository;
let createServiceUseCase: CreateServiceUseCase;

describe("Create service", () => {
  beforeEach(() => {
    servicesRepositoryInMemory = new ServicesRepositoryInMemory();
    createServiceUseCase = new CreateServiceUseCase(servicesRepositoryInMemory);
  });

  it("should be able to create a new service", async () => {
    const service = {
      name: "Test name",
      value: 30.5,
      time: 11,
      percentage: 20,
    };

    const serviceCreated = await createServiceUseCase.execute({
      name: service.name,
      value: service.value,
      time: service.time,
      percentage: service.percentage,
    });

    expect(serviceCreated).toHaveProperty("id");
  });
});
