import { Repository, getRepository } from "typeorm";
import { Professional } from "../entities/Professional";
import { ICreateProfessionalDTO } from "@modules/professional/dtos/ICreateProfessionalDTO";
import { IProfessionalsRepository } from "@modules/professional/repositories/IProfessionalsRepository";

class ProfessionalsRepository implements IProfessionalsRepository {
  private repository: Repository<Professional>;

  constructor() {
    this.repository = getRepository(Professional);
  }

  async create({ name, fone }: ICreateProfessionalDTO): Promise<Professional> {
    const professional = this.repository.create({
      name,
      fone,
    });

    await this.repository.save(professional);

    return professional;
  }

  async findByFone(fone: string): Promise<Professional> {
    return await this.repository.findOne({ fone });
  }
}

export { ProfessionalsRepository };
