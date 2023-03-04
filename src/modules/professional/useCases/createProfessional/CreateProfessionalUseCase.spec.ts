import { ProfessionalsRepositoryInMemory } from "@modules/professional/repositories/in-memory/ProfessionalsRepositoryInMemory";
import { IProfessionalsRepository } from "@modules/professional/repositories/IProfessionalsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateProfessionalUseCase } from "./CreateProfessionalUseCase";

let professionalsRepositoryInMemory: IProfessionalsRepository;
let createProfessionalUseCase: CreateProfessionalUseCase;

describe("Create professional", () => {
  beforeEach(() => {
    professionalsRepositoryInMemory = new ProfessionalsRepositoryInMemory();
    createProfessionalUseCase = new CreateProfessionalUseCase(
      professionalsRepositoryInMemory
    );
  });

  it("should be able to create a new professional", async () => {
    const professional = {
      name: "Test name",
      fone: "(82) 99999-9999",
    };

    const professionalCreated = await createProfessionalUseCase.execute({
      name: professional.name,
      fone: professional.fone,
    });

    expect(professionalCreated).toHaveProperty("id");
  });

  it("should not be able to create a new professional with a name or fone already registered", async () => {
    const professional1 = {
      name: "Test name",
      fone: "(82) 99999-9999",
    };

    const professional2 = {
      name: "Test name 2",
      fone: "99999-9999",
    };

    const professionalCreated = await createProfessionalUseCase.execute({
      name: professional1.name,
      fone: professional1.fone,
    });

    await expect(
      createProfessionalUseCase.execute({
        name: professionalCreated.name,
        fone: professionalCreated.fone,
      })
    ).rejects.toEqual(new AppError("Professional already exists!"));
  });
});
