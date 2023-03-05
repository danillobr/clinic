import { Professional } from "@modules/professional/infra/typeorm/entities/Professional";
import { ProfessionalsRepositoryInMemory } from "@modules/professional/repositories/in-memory/ProfessionalsRepositoryInMemory";
import { IProfessionalsRepository } from "@modules/professional/repositories/IProfessionalsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateProfessionalUseCase } from "../createProfessional/CreateProfessionalUseCase";

let professionalsRepositoryInMemory: IProfessionalsRepository;
let createProfessionalUseCase: CreateProfessionalUseCase;

describe("List all professionals", () => {
  beforeEach(() => {
    professionalsRepositoryInMemory = new ProfessionalsRepositoryInMemory();
    createProfessionalUseCase = new CreateProfessionalUseCase(
      professionalsRepositoryInMemory
    );
  });

  it("should be able to list all professionals", async () => {
    let professionals: Professional[] = [];

    const professional1 = {
      name: "professional 1",
      fone: "(82) 99999-9999",
    };

    const professional2 = {
      name: "professional 2",
      fone: "(82) 88888-8888",
    };

    const prof1 = await createProfessionalUseCase.execute({
      name: professional1.name,
      fone: professional1.fone,
    });

    const prof2 = await createProfessionalUseCase.execute({
      name: professional2.name,
      fone: professional2.fone,
    });

    professionals.push(prof1, prof2);

    const listProfissionals = await professionalsRepositoryInMemory.list();

    expect(listProfissionals).toEqual(professionals);
    expect(listProfissionals.length).toBe(2);
  });
});
