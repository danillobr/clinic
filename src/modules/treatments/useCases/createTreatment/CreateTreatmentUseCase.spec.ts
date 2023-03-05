// import { ServicesRepositoryInMemory } from "@modules/services/repositories/in-memory/ServicesRepositoryInMemory";
// import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
// import { AppError } from "@shared/errors/AppError";

// import { CreateServiceUseCase } from "./CreateTreatmentUseCase";

// let servicesRepositoryInMemory: IServicesRepository;
// let createServiceUseCase: CreateServiceUseCase;

// describe("Create service", () => {
//   beforeEach(() => {
//     servicesRepositoryInMemory = new ServicesRepositoryInMemory();
//     createServiceUseCase = new CreateServiceUseCase(servicesRepositoryInMemory);
//   });

//   it("should be able to create a new service", async () => {
//     const service = {
//       name: "Test name",
//       value: 30.5,
//       time: 11,
//       percentage: 20,
//     };

//     const serviceCreated = await createServiceUseCase.execute({
//       name: service.name,
//       value: service.value,
//       time: service.time,
//       percentage: service.percentage,
//     });

//     expect(serviceCreated).toHaveProperty("id");
//   });

//   it("should not be able to create a new service with an existing name", async () => {
//     const service1 = {
//       name: "Test name",
//       value: 30.5,
//       time: 11,
//       percentage: 20,
//     };

//     await createServiceUseCase.execute({
//       name: service1.name,
//       value: service1.value,
//       time: service1.time,
//       percentage: service1.percentage,
//     });

//     const service2 = {
//       name: "Test name",
//       value: 43.5,
//       time: 9,
//       percentage: 12,
//     };

//     await expect(
//       createServiceUseCase.execute({
//         name: service2.name,
//         value: service2.value,
//         time: service2.time,
//         percentage: service2.percentage,
//       })
//     ).rejects.toEqual(new AppError("Service already exists!"));
//   });
// });
