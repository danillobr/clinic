import { ICreateProfessionalDTO } from "@modules/professional/dtos/ICreateProfessionalDTO";
import { Professional } from "@modules/professional/infra/typeorm/entities/Professional";

import { IProfessionalsRepository } from "../IProfessionalsRepository";

class ProfessionalsRepositoryInMemory implements IProfessionalsRepository {
  professionals: Professional[] = [];

  async create({ name, fone }: ICreateProfessionalDTO): Promise<Professional> {
    const professional = new Professional();

    Object.assign(professional, {
      name,
      fone,
    });

    this.professionals.push(professional);

    return professional;
  }

  async findByFone(fone: string): Promise<Professional> {
    return this.professionals.find(
      (professional) => professional.fone === fone
    );
  }

  async list(): Promise<Professional[]> {
    const all = this.professionals;
    return all;
  }
}

export { ProfessionalsRepositoryInMemory };
